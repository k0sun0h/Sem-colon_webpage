import '../../css/Applystatus.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Applystatus() {
  const [myApplications, setMyApplications] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const applicants = JSON.parse(localStorage.getItem('applicants')) || [];

    // 현재 로그인한 사용자의 지원 목록만 필터링
    const myApps = applicants.filter(app => app.applicantEmail === user?.email);
    setMyApplications(myApps);
  }, []);

  const handleCancel = (postId, email) => {
  const confirmed = window.confirm('정말로 지원을 취소하시겠습니까?');
  if (!confirmed) return;

  const applicants = JSON.parse(localStorage.getItem('applicants')) || [];
  const updated = applicants.filter(app => !(app.postId === postId && app.applicantEmail === email));

  localStorage.setItem('applicants', JSON.stringify(updated));

  // 현재 사용자 지원 목록만 다시 필터링하여 반영
  setMyApplications(updated.filter(app => app.applicantEmail === email));
};

  
  return (
    <>
      <div className="fixed-apply-background"></div>

      <div className="apstatus-title">내 지원 작성 현황</div>

      <div className="ap-con">
        <div className="ap-con-box">
          <div className="ap-line"></div>
          <div className="vertical1 apline-1"></div>
          <div className="vertical1 apline-2"></div>

          <div className="label-aptitle">제목</div>
          <div className="label-aptitle label-apstatus">지원 현황</div>
          <div className="label-aptitle label-apcheck">지원글 확인 및 취소</div>
          
          {myApplications.map((app, index) => (
            <div className="ap-row" key={index}>
              <div className="Ap-title">{app.postTitle}</div>
              <div className="Ap-status">지원 완료</div>
              <div className="Ap-action" onClick={() => navigate(`/study/detail/${app.postId}`)}>
                🔍
                </div>
                <div className="Ap-cancel" onClick={() => handleCancel(app.postId, app.applicantEmail)}>
                  ❌ 
                </div>
                </div>
              ))}         
        </div>
      </div>
    </>
  );
}

export default Applystatus;
