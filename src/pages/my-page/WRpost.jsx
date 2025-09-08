import '../../css/WRpost.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WRpost() {
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () => {
      const savedPosts = JSON.parse(localStorage.getItem('postList')) || [];
      const user = JSON.parse(localStorage.getItem('user'));
      setPostList(user?.email ? savedPosts.filter(p => p.email === user.email) : []);
    };
    handleStorage();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const applicants = JSON.parse(localStorage.getItem('applicants')) || [];
  const countApplicantsForPost = (postId) =>
    applicants.filter(app => app.postId === postId).length;

  return (
    <>
      <div className="fx-background" />
      <div className="WR-title">모집글 작성 현황</div>

      <div className="con">
        <div className="con-box">
          <div className="wr-header">
            <span>제목</span>
            <span>모집 날짜</span>
            <span>지원 현황</span>
          </div>

          {postList.map((post, idx) => (
            <div className="post-row" key={idx}>
              <span>{post.title}</span>
              <span>{post.recruitStart} ~ {post.recruitEnd}</span>
              <span
                className="clickable"
                onClick={() => navigate(`/applicants/${post.id}`)}
                title="지원자 보기"
              >
                {countApplicantsForPost(post.id)}명
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WRpost;
