import { useLocation } from "react-router-dom";
import { useState } from "react";
import "../css/ProjectDetail.css";

function ProjectDetail() {
  const location = useLocation();
  const data = location.state;

  const title = data?.title;
  const period = data?.period || "기간 정보 없음";
  const [isCompleted, setIsCompleted] = useState(false);

  const members = [
    { name: "김기획", role: "기획" },
    { name: "이디자인", role: "디자인" },
    { name: "최개발", role: "개발" },
  ];

  if (!title) {
    return <div className="study-detail-container">잘못된 접근입니다.</div>;
  }

  const handleComplete = () => {
    alert("프로젝트가 완료되었습니다.");
    setIsCompleted(true);
  };

  return (
    <>
      <div className="study-background"></div>
      <div className="study-detail-container">
        <div className="study-header">
          <h2>{title}</h2>
          <p>진행 기간: {period}</p>
        </div>

        <div className="project-description">
          <p>이 프로젝트는 현재 세부 정보를 준비 중입니다.</p>
        </div>

        <div className="member-list">
          <h3>참여 인원</h3>
          <div className="member-icons">
            {members.map((m, idx) => (
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

        {!isCompleted && (
          <button className="complete-button" onClick={handleComplete}>
            완료 처리
          </button>
        )}
      </div>
    </>
  );
}

export default ProjectDetail;
