import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../../../css/Write.css'; // 스타일 재사용

function Detail({ dataList }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const post = dataList.find(post => String(post.id) === String(id));
  const location = useLocation();
  const fromApplyStatus = location.state?.fromApplyStatus || false;


  if (!post) return <div>해당 모집글을 찾을 수 없습니다.</div>;



  return (
    <>
      <div className="fixed-background"></div>
      <div className="content">
        <div className="writ-box">
          <button className="close-button" onClick={() => navigate('/study')}>X</button>
          <div className="sepa-line"></div>
          <div className="write-title">모집글 상세 정보</div>

          <div className="form-section">
            <div className="form-group">
              <label className="form-label">제목</label>
              <input
                type="text"
                className="input-box title-input"
                value={post.title}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">모집 인원</label>
              <input
                type="text"
                className="input-box small-input"
                value={`${post.recruitCount}명`}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">모집 날짜</label>
              <input
                type="text"
                className="input-box small-input"
                value={post.recruitStart}
                readOnly
              />
              <span className="tilde">~</span>
              <input
                type="text"
                className="input-box small-input"
                value={post.recruitEnd}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">진행 날짜</label>
              <input
                type="text"
                className="input-box small-input"
                value={post.scheduleStart}
                readOnly
              />
              <span className="tilde">~</span>
              <input
                type="text"
                className="input-box small-input"
                value={post.scheduleEnd}
                readOnly
              />
            </div>

            <div className="form-group textarea-group">
              <label className="form-label textarea-label">기타 내용</label>
              <textarea
                className="input-box textarea-input"
                value={post.etc}
                readOnly
              />
            </div>

            {/* 지원하기 버튼 */}
            {!fromApplyStatus && (
              <button
              className="finish-button"
              onClick={() => {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user?.email === post.email) {
                  alert('본인이 작성한 모집글입니다.');
                  return;
                }
                navigate(`/study/appl/${post.id}`);
              }}
              >
                지원하기
                </button>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
