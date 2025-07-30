import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Study&Project.css";

function StudyProject() {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState(location.state?.category || "진행 중");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const initialOngoing = [
    { title: "프론트엔드 스터디", members: 4, period: "2025.04.16 ~ 2025.07.09", type: "study", progress: 80 },
    { title: "2025 하계 방학 프로젝트", members: 3, period: "2025.07.01 ~ 2025.07.31", type: "project", completed: false },
    { title: "알고리즘 스터디", members: "상시 모집", period: "상시 진행", type: "study", progress: 100 },
  ];

  const initialCompleted = [
    { title: "2024 겨울방학 프로젝트", members: 5, period: "2024.01.03 ~ 2024.02.20", type: "project" },
    { title: "리액트 심화 스터디", members: 3, period: "2024.03.01 ~ 2024.05.30", type: "study" },
  ];

  const [ongoingList, setOngoingList] = useState(initialOngoing);
  const [completedList, setCompletedList] = useState(initialCompleted);

  // 자동 완료 처리
  useEffect(() => {
    const completedNow = ongoingList.filter(
      (item) => (item.type === "study" && item.progress === 100) ||
                (item.type === "project" && item.completed)
    );
    if (completedNow.length > 0) {
      setCompletedList(prev => [...prev, ...completedNow]);
      setOngoingList(prev => prev.filter(item => !completedNow.includes(item)));
    }
  }, [ongoingList]);

  const currentList = category === "진행 중" ? ongoingList : completedList;
  const totalPages = Math.ceil(currentList.length / itemsPerPage);
  const currentPageItems = currentList.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const changePage = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  const handleRowClick = (item) => {
    if (item.type === "study") {
      navigate("/studyDetail", {
        state: { ...item, isStudy: true },
      });
    } else if (item.type === "project") {
      navigate("/projectDetail", {
        state: { ...item, isStudy: false },
      });
    }
  };

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
          {currentPageItems.map((item, idx) => (
            <div
              className="table-row"
              key={idx}
              onClick={() => handleRowClick(item)}
              style={{ cursor: "pointer" }}
            >
              <span>{item.title}</span>
              <span>{item.members}</span>
              <span>{item.period}</span>
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
