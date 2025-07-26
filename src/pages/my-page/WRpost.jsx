import './WRpost.css';
import { useEffect, useState } from 'react';

function WRpost() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
  const savedPosts = JSON.parse(localStorage.getItem('postList')) || [];
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.email) {
    const filteredPosts = savedPosts.filter(post => post.email === user.email);
    setPostList(filteredPosts);
  } else {
    setPostList([]);  // 로그인 안 되어 있으면 아무 것도 안 보이게
  }
}, []);


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
          <div className="label-WRtitle label-people">지원자 수</div>

          {/* ✅ 여러 개의 post 출력 */}
          {postList.map((post, idx) => (
            <div key={idx} className="post-row">
              <div className="cell title-cell">
                <span className="partial-move1">{post.title}</span>
              </div>
              <div className="cell date-cell">
                <span className="partial-move2">{post.recruitStart} ~ {post.recruitEnd}</span>
              </div>
              <div className="cell people-cell">
                <span className="partial-move3">0명</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WRpost;
