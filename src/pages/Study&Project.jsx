import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Study&Project.css";

/** 날짜/기간 파서: "YYYY-MM-DD ~ YYYY-MM-DD", "YYYY.MM.DD ~ YYYY.MM.DD", "상시 진행" 모두 대응 */
function parseRange(input) {
  if (!input) return { start: null, end: null, always: false };
  if (typeof input === "object" && (input.start || input.end)) {
    return {
      start: input.start ? new Date(String(input.start).replace(/\./g, "-")) : null,
      end: input.end ? new Date(String(input.end).replace(/\./g, "-")) : null,
      always: false,
    };
  }
  const raw = String(input).trim();
  const noSpace = raw.replace(/\s+/g, "");
  if (/상시/.test(noSpace)) return { start: null, end: null, always: true };

  const [a, b] = raw.split("~").map((v) => v?.trim());
  const toDate = (s) => (s ? new Date(s.replace(/\./g, "-")) : null);
  const start = toDate(a);
  const end = toDate(b || a);
  return { start, end, always: false };
}

/** 화면 표시용 기간 문자열 */
function fmtRange(range, fallbackText = "상시 진행") {
  if (!range || range.always || (!range.start && !range.end)) return fallbackText;
  const pad = (n) => String(n).padStart(2, "0");
  const toStr = (d) =>
    `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
  const s = range.start ? toStr(range.start) : "";
  const e = range.end ? toStr(range.end) : s;
  return `${s} ~ ${e}`;
}

/** 상태 계산: 모집 중 / 진행 중 / 완료 */
function computeStatus({ recruitRange, progressRange }) {
  const now = new Date();

  // 1) 모집 중: 모집 종료일이 아직 남아있다면
  if (recruitRange?.always) return "진행 중";
  if (recruitRange?.end && now <= recruitRange.end) return "모집 중";

  // 2) 진행 중: 모집은 지났고, 진행 종료일이 아직 남아있다면
  if (progressRange?.always) return "진행 중";
  if (progressRange?.end && now <= progressRange.end) return "진행 중";

  // 3) 완료: 진행 종료일이 지났다면
  if (progressRange?.end && now > progressRange.end) return "완료";

  // 정보 부족 시 기본
  return "진행 중";
}

/** 서버 응답 -> 공통 아이템 형태로 정규화 */
function normalizeStudy(it) {
  const recruitRange = parseRange(it.recruitDate);
  const progressRange = parseRange(it.progressDate);
  const status = computeStatus({ recruitRange, progressRange });
  return {
    id: it.id ?? it._id ?? crypto.randomUUID(),
    type: "study",
    title: it.title ?? "",
    members: it.personnel ?? "",
    recruitRange,
    progressRange,
    // 탭/표시용
    status,
    periodText:
      status === "모집 중" ? fmtRange(recruitRange, "상시 모집") : fmtRange(progressRange),
    raw: it,
  };
}
function normalizeProject(it) {
  const recruitRange = parseRange(it.recruitDate);
  const progressRange = parseRange(it.progressDate);
  const status = computeStatus({ recruitRange, progressRange });
  return {
    id: it.id ?? it._id ?? crypto.randomUUID(),
    type: "project",
    title: it.title ?? "",
    members: it.personnel ?? "",
    recruitRange,
    progressRange,
    status,
    periodText:
      status === "모집 중" ? fmtRange(recruitRange, "상시 모집") : fmtRange(progressRange),
    raw: it,
  };
}

function StudyProject() {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState(location.state?.category || "진행 중");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const [loading, setLoading] = useState(true);
  const [studyItems, setStudyItems] = useState([]);
  const [projectItems, setProjectItems] = useState([]);
  const [error, setError] = useState("");

  // 서버에서 스터디/프로젝트 목록을 받아온다.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const [studiesRes, projectsRes] = await Promise.all([
          fetch("/api/study"),
          fetch("/api/project"),
        ]);
        if (!studiesRes.ok) throw new Error(`GET /api/study ${studiesRes.status}`);
        if (!projectsRes.ok) throw new Error(`GET /api/project ${projectsRes.status}`);

        const studies = await studiesRes.json().catch(() => []);
        const projects = await projectsRes.json().catch(() => []);

        if (!alive) return;
        setStudyItems(Array.isArray(studies) ? studies.map(normalizeStudy) : []);
        setProjectItems(Array.isArray(projects) ? projects.map(normalizeProject) : []);
      } catch (e) {
        if (alive) setError(e.message || "목록을 불러오지 못했습니다.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // 진행/완료 탭용 리스트 계산 (모집 중은 진행 중 탭에 포함되어 자연스럽게 넘어가도록)
  const { ongoingList, completedList } = useMemo(() => {
    const all = [...studyItems, ...projectItems];

    const ongoing = all.filter((x) => x.status === "모집 중" || x.status === "진행 중");
    const done = all.filter((x) => x.status === "완료");

    // 정렬 예시: 최신 진행(또는 모집) 종료일이 가까운 순
    const getEnd = (x) =>
      (x.status === "모집 중" ? x.recruitRange?.end : x.progressRange?.end) ?? new Date(8640000000000000);
    ongoing.sort((a, b) => getEnd(a) - getEnd(b));

    // 완료는 최근 완료 먼저
    const getProgEnd = (x) => x.progressRange?.end ?? new Date(0);
    done.sort((a, b) => getProgEnd(b) - getProgEnd(a));

    return { ongoingList: ongoing, completedList: done };
  }, [studyItems, projectItems]);

  const currentList = category === "진행 중" ? ongoingList : completedList;
  const totalPages = Math.ceil(currentList.length / itemsPerPage) || 1;
  const currentPageItems = currentList.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const changePage = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  const handleRowClick = (item) => {
    if (item.type === "study") {
      navigate("/studyDetail", {
        state: {
          isStudy: true,
          id: item.id,
          title: item.title,
          periodRecruit: fmtRange(item.recruitRange, "상시 모집"),
          periodProgress: fmtRange(item.progressRange, "상시 진행"),
          status: item.status,
          members: item.members,
          raw: item.raw,
        },
      });
    } else {
      navigate("/projectDetail", {
        state: {
          isStudy: false,
          id: item.id,
          title: item.title,
          periodRecruit: fmtRange(item.recruitRange, "상시 모집"),
          periodProgress: fmtRange(item.progressRange, "상시 진행"),
          status: item.status,
          members: item.members,
          raw: item.raw,
        },
      });
    }
  };

  if (loading) {
    return (
      <>
        <div className="study-background"></div>
        <div className="study-container" style={{ color: "#fff" }}>불러오는 중…</div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <div className="study-background"></div>
        <div className="study-container" style={{ color: "#fff" }}>{error}</div>
      </>
    );
  }

  return (
    <>
      <div className="study-background"></div>
      <div className="study-container">
        <div className="members-category">
          {["진행 중", "완료"].map((label) => (
            <button
              key={label}
              className={`members-tab ${category === label ? "active" : ""}`}
              onClick={() => {
                setCategory(label);
                setPage(1);
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="study-table">
          <div className="table-header">
            <span>제목</span>
            <span>참여 인원</span>
            <span>진행 날짜</span>
          </div>

          {currentPageItems.map((item) => (
            <div
              className="table-row"
              key={`${item.type}-${item.id}`}
              onClick={() => handleRowClick(item)}
              style={{ cursor: "pointer" }}
              title={item.status} /* 툴팁으로 상태 확인 */
            >
              {/* 제목 뒤에 작은 상태표시 뱃지(선택) */}
              <span>
                {item.title}
                {item.status === "모집 중" ? "  (모집 중)" : ""}
              </span>
              <span>{item.members}</span>
              <span>{item.periodText}</span>
            </div>
          ))}
        </div>

        <div className="pagination">
          <span className="page-btn" onClick={() => changePage(1)}>처음</span>
          {[...Array(totalPages)].map((_, idx) => (
            <span
              key={idx}
              className={`page-btn ${page === idx + 1 ? "active" : ""}`}
              onClick={() => changePage(idx + 1)}
            >
              {idx + 1}
            </span>
          ))}
          <span className="page-btn" onClick={() => changePage(page + 1)}>&gt;</span>
        </div>
      </div>
    </>
  );
}

export default StudyProject;
