import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/Study&Project.css";

function StudyProject() {
  const location = useLocation();
  const [category, setCategory] = useState(location.state?.category || "진행 중");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const ongoing = [
    { title: "프론트 엔드 스터디", members: 4, period: "2025.04.16 ~ 2025.07.09" },
    { title: "2025 하계 방학 프로젝트", members: 3, period: "2025.07.01 ~ 2025.07.31" },
    { title: "알고리즘 스터디", members: "상시 모집", period: "상시 진행" },
    { title: "스터디4", members: 2, period: "2025.05.01 ~ 2025.06.01" },
    { title: "스터디5", members: 2, period: "2025.06.01 ~ 2025.07.01" },
    { title: "스터디6", members: 2, period: "2025.06.15 ~ 2025.07.15" },
    { title: "스터디7", members: 2, period: "2025.06.20 ~ 2025.07.25" },
    { title: "스터디8", members: 2, period: "2025.06.25 ~ 2025.07.30" },
    { title: "스터디9", members: 2, period: "2025.06.20 ~ 2025.07.25" },
    { title: "스터디10", members: 2, period: "2025.06.25 ~ 2025.07.30" },
  ];

  const completed = [
    { title: "2024 겨울방학 프로젝트", members: 5, period: "2024.01.03 ~ 2024.02.20" },
    { title: "리액트 심화 스터디", members: 3, period: "2024.03.01 ~ 2024.05.30" },
  ];

  const currentList = category === "진행 중" ? ongoing : completed;

  const totalPages = Math.ceil(currentList.length / itemsPerPage);
  const currentPageItems = currentList.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const changePage = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  return (
    <>
      <div className="study-background"></div>
      <div className="study-container">
        {/* 탭 */}
        <div className="members-category">
          {["진행 중", "완료"].map((label) => (
            <button
              key={label}
              className={`members-tab ${category === label ? "active" : ""}`}
              onClick={() => {
                setCategory(label);
                setPage(1); // 카테고리 바뀌면 첫 페이지로
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 테이블 */}
        <div className="study-table">
          <div className="table-header">
            <span>제목</span>
            <span>참여 인원</span>
            <span>진행 날짜</span>
          </div>
          {currentPageItems.map((item, idx) => (
            <div className="table-row" key={idx}>
              <span>{item.title}</span>
              <span>{item.members}</span>
              <span>{item.period}</span>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
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