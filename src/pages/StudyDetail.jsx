import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/StudyDetail.css";

function StudyDetail() {
  const location = useLocation();
  const data = location.state || {};

  const title = data.title ?? "스터디 제목 없음";
  const isStudy = data.isStudy ?? true;
  const period = data.period ?? "기간 정보 없음";
  const leaderEmail = data.leaderEmail ?? "kimsunhye1225@suwon.ac.kr";

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isLeader = currentUser.email === leaderEmail;

  const [progress, setProgress] = useState(data.progress ?? 0);
  const [hasAlerted, setHasAlerted] = useState(false);

  const members = [
    { name: "홍길동", role: "스터디장" },
    { name: "최철수" },
    { name: "임꺽정" },
    { name: "짱 구" },
  ];

  useEffect(() => {
    if (progress === 100 && !hasAlerted) {
      alert("스터디가 완료되었습니다.");
      setHasAlerted(true);
    }
  }, [progress, hasAlerted]);

  return (
    <>
      <div className="study-background"></div>
      <div className="study-detail-container">
        <div className="study-header">
          <h1>{title}</h1>
          <p>진행 기간: {period}</p>
        </div>

        <div className="project-description">
          <p>이 스터디는 현재 세부 정보를 준비 중입니다.</p>
        </div>

        {isStudy && (
          <div className="progress-section">
            <div className="progress-title">
              <span>진행률</span>
              {isLeader ? (
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                />
              ) : (
                <span>{progress}%</span>
              )}
            </div>
          </div>
        )}

        <div className="member-list">
          <div className="member-num">참여 인원</div>
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
      </div>
    </>
  );
}

export default StudyDetail;