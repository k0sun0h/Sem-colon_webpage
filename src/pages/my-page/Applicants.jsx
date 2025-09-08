import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../css/WRpost.css'; // 카드/그리드/버튼 스타일 재사용

function Applicants() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);

  // 해당 postId 지원자만 표시
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('applicants')) || [];
    setApplicants(all.filter(a => String(a.postId) === String(postId)));
  }, [postId]);

  // 수락/거절 결정
  const handleDecision = (email, type) => {
    const all = JSON.parse(localStorage.getItem('applicants')) || [];
    const updated = all.map(a =>
      String(a.postId) === String(postId) && a.applicantEmail === email
        ? { ...a, decision: type }
        : a
    );
    localStorage.setItem('applicants', JSON.stringify(updated));
    setApplicants(updated.filter(a => String(a.postId) === String(postId)));
  };

  return (
    <>
      <div className="fx-background" />
      <div className="WR-title">지원자 현황</div>

      <div className="con">
        <div className="con-box">
          {/* 헤더: 카드 상단 고정 */}
          <div className="wr-header">
            <span>이름</span>
            <span>학과</span>
            <span>수락 / 거절</span>
          </div>

          {/* 데이터 행 */}
          {applicants.map((app, idx) => (
            <div key={idx} className="post-row">
              {/* 이름(열람 이동) */}
              <span
                className="name-clickable"
                onClick={() =>
                  navigate(`/view-appl/${app.postId}/${app.applicantEmail}`)
                }
                title="지원서 열람"
              >
                {app.name || app.applicantEmail?.split('@')[0]}
              </span>

              {/* 학과 */}
              <span>{app.department || '미정'}</span>

              {/* 수락/거절 버튼 또는 상태 */}
              <span>
                <div className="decision-buttons">
                  {app.decision === 'accepted' ? (
                    <button className="accept-btn">수락✅</button>
                  ) : app.decision === 'rejected' ? (
                    <button className="reject-btn">거절❌</button>
                  ) : (
                    <>
                      <button
                        className="accept-btn"
                        onClick={() =>
                          handleDecision(app.applicantEmail, 'accepted')
                        }
                      >
                        수락✅
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() =>
                          handleDecision(app.applicantEmail, 'rejected')
                        }
                      >
                        거절❌
                      </button>
                    </>
                  )}
                </div>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Applicants;
