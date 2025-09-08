import '../../css/Applystatus.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Applystatus() {
  const [myApplications, setMyApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const applicants = JSON.parse(localStorage.getItem('applicants')) || [];
    const myApps = applicants.filter(app => app.applicantEmail === user?.email);
    setMyApplications(myApps);
  }, []);

  const handleCancel = (postId, email) => {
    if (!window.confirm('정말로 지원을 취소하시겠습니까?')) return;
    const all = JSON.parse(localStorage.getItem('applicants')) || [];
    const updated = all.filter(a => !(a.postId === postId && a.applicantEmail === email));
    localStorage.setItem('applicants', JSON.stringify(updated));
    setMyApplications(updated.filter(a => a.applicantEmail === email));
  };

  return (
    <>
      <div className="fixed-apply-background" />
      <div className="apstatus-title">내 지원 현황</div>

      <div className="ap-con">
        <div className="ap-con-box">
          {/* ▼ 헤더가 맨 위에 위치 */}
          <div className="ap-header">
            <span>제목</span>
            <span>지원 현황</span>
            <span>지원글 확인 및 취소</span>
          </div>

          {myApplications.map((app, i) => {
            const status =
              app.decision === 'accepted' ? '수락됨✅' :
              app.decision === 'rejected' ? '거절됨❌' : '대기 중';
            return (
              <div className="ap-row" key={i}>
                <span className="Ap-title">{app.postTitle}</span>
                <span className="Ap-status">{status}</span>
                <span className="Ap-actions">
                  <button
                    type="button"
                    className="Ap-action"
                    onClick={() => navigate(`/study/detail/${app.postId}`)}
                    title="지원글 상세로 이동"
                  >
                    지원글 확인🔍
                  </button>
                  {(!app.decision || app.decision === null) && (
                    <button
                      type="button"
                      className="Ap-cancel"
                      onClick={() => handleCancel(app.postId, app.applicantEmail)}
                      title="지원 취소"
                    >
                      지원 취소❌
                    </button>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Applystatus;
