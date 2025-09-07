import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import "../css/StudyDetail.css";

/** 기간 문자열을 안전하게 출력 */
function safeText(v, fb = "정보 없음") {
  return v && String(v).trim() ? String(v) : fb;
}

function StudyDetail() {
  const location = useLocation();
  const data = location.state || {};

  const title = data.title ?? "스터디/프로젝트";
  const isStudy = data.isStudy ?? true;

  // 목록에서 넘겨준 상태/기간(모집/진행)을 그대로 사용
  const status = data.status ?? "진행 중";
  const periodRecruit = data.periodRecruit ?? "상시 모집";
  const periodProgress = data.periodProgress ?? "상시 진행";
  const members = data.members ?? "";

  // 화면에 보여줄 “진행 기간” 텍스트: 모집 중이면 모집기간, 아니면 진행기간 자동 전환
  const mainPeriod = useMemo(() => {
    return status === "모집 중" ? periodRecruit : periodProgress;
  }, [status, periodRecruit, periodProgress]);

  // 데모용 멤버(기존 고정 데이터 유지)
  const mockMembers = [
    { name: "홍길동", role: "스터디장" },
    { name: "최철수" },
    { name: "임꺽정" },
    { name: "짱 구" },
  ];

  return (
    <>
      <div className="study-background"></div>
      <div className="study-detail-container">
        <div className="study-header">
          <h1>{safeText(title)}</h1>
          <p>현재 상태: <strong>{status}</strong></p>
          <p>진행 기간: {safeText(mainPeriod)}</p>

          {/* 보조 정보도 함께 노출 */}
          <div style={{ marginTop: 6, opacity: 0.85 }}>
            <small>모집 기간: {safeText(periodRecruit)}</small><br />
            <small>진행 기간: {safeText(periodProgress)}</small><br />
            {members && <small>참여 인원: {members}명</small>}
          </div>
        </div>

        <div className="project-description">
          <p>이 {isStudy ? "스터디" : "프로젝트"}의 세부 정보는 곧 업데이트될 예정입니다.</p>
        </div>

        {/* (기존) 진행률 영역은 서버 연동 전이므로 일단 숨김/유지 선택 가능
        {isStudy && (
          <div className="progress-section">
            <div className="progress-title">
              <span>진행률</span>
              <span>— 모집/진행/완료는 날짜로 자동 계산됩니다.</span>
            </div>
          </div>
        )}
        */}

        <div className="member-list">
          <div className="member-num">참여 인원</div>
          <div className="member-icons">
            {mockMembers.map((m, idx) => (
              <div key={idx}>
                <div className="member-circle" />
                <div className="member-info">
                  <div className="member-role">{m.role}</div>
                  <div className="member-name">{m.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudyDetail;
