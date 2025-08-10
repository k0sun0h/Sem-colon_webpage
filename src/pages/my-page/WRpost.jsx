import '../../css/WRpost.css';
import { useEffect, useState } from 'react';

function WRpost() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const handleStorage = () => {
      const savedPosts = JSON.parse(localStorage.getItem('postList')) || [];
      const user = JSON.parse(localStorage.getItem('user'));

      if (user && user.email) {
        const filteredPosts = savedPosts.filter(post => post.email === user.email);
        setPostList(filteredPosts);
      } else {
        setPostList([]); // 로그인 안 되어 있으면 아무 것도 안 보이게
      }
    };

    handleStorage(); // 마운트 시 즉시 실행
    window.addEventListener('storage', handleStorage); // 다른 탭에서 localStorage 변경 감지

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const applicants = JSON.parse(localStorage.getItem('applicants')) || [];
  
  const countApplicantsForPost = (postId) => {
  return applicants.filter(app => app.postId === postId).length;
};


  return (
    <>
      <div className="fx-background"></div>

      <div className="WR-title">모집글 작성 현황</div>

      <div className="con">
        <div className="con-box">
          <div className="sp-line"></div>
          <div className="vertical line-1"></div>
          <div className="vertical line-2"></div>

          <div className="label-WRtitle">제목</div>
          <div className="label-WRtitle label-WRdate">모집 날짜</div>
          <div className="label-WRtitle label-people">지원 현황</div>

          {postList.map((post, idx) => (
            <div key={idx} className="post-row">
              <div className="cell title-cell">
                <span className="partial-move1">{post.title}</span>
              </div>
              <div className="cell date-cell">
                <span className="partial-move2">{post.recruitStart} ~ {post.recruitEnd}</span>
              </div>
              <div className="cell people-cell">
                <span className="partial-move3">{countApplicantsForPost(post.id)}명</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WRpost;
