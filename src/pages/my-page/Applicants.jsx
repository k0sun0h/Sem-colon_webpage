import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../css/WRpost.css'; // 동일한 스타일 사용

function Applicants() {
  const { postId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();

  // 해당 postId에 해당하는 지원자만 필터링
  useEffect(() => {
    const allApplicants = JSON.parse(localStorage.getItem('applicants')) || [];
    const filtered = allApplicants.filter(app => app.postId === postId);
    setApplicants(filtered);
  }, [postId]);

  // 수락 또는 거절 처리 함수
  const handleDecision = (email, type) => {
    const allApplicants = JSON.parse(localStorage.getItem('applicants')) || [];

    const updated = allApplicants.map(app => {
      if (app.postId === postId && app.applicantEmail === email) {
        return { ...app, decision: type }; // 결정 상태 추가
      }
      return app;
    });

    localStorage.setItem('applicants', JSON.stringify(updated));

    // 현재 페이지의 지원자만 다시 필터링해서 적용
    const filtered = updated.filter(app => app.postId === postId);
    setApplicants(filtered);
  };

  return (
    <>
      <div className="fx-background"></div>

      <div className="WR-title">지원자 현황</div>

      <div className="con">
        <div className="con-box">
          <div className="sp-line"></div>
          <div className="vertical line-1"></div>
          <div className="vertical line-2"></div>

          <div className="label-WRtitle">이름</div>
          <div className="label-WRtitle label-WRdate">학과</div>
          <div className="label-WRtitle label-people">수락 or 거절</div>

          {applicants.map((app, idx) => (
            <div key={idx} className="post-row">
              <div className="cell title-cell">
                <span
                  className="partial-move1 name-clickable"
                  onClick={() => navigate(`/view-appl/${app.postId}/${app.applicantEmail}`)}
                >
                  {app.name || app.applicantEmail?.split('@')[0]}
                </span>
              </div>
              <div className="cell date-cell">
                <span className="partial-move0">{app.department || '미정'}</span>
              </div>
              <div className="cell people-cell">
                <span className="partial-move3">
                  <div className="decision-buttons">
                    {app.decision === 'accepted' ? (
                      <button className="accept-btn">수락✅</button>
                    ) : app.decision === 'rejected' ? (
                      <button className="reject-btn">거절❌</button>
                    ) : (
                      <>
                        <button
                          className="accept-btn"
                          onClick={() => handleDecision(app.applicantEmail, 'accepted')}
                        >
                          수락✅
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleDecision(app.applicantEmail, 'rejected')}
                        >
                          거절❌
                        </button>
                      </>
                    )}
                  </div>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Applicants;