import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../../../css/Write.css';

function Detail({ dataList }) {
  const navigate = useNavigate(); // 페이지 이동 함수
  const { id } = useParams();     // URL에서 id 추출
  const location = useLocation(); // 이전 페이지에서 전달된 상태 확인
  const fromApplyStatus = location.state?.fromApplyStatus || false; // 지원 직후 표시 여부

  // dataList에서 해당 id의 글 찾기
  const post = (dataList || []).find((p) => String(p.id) === String(id));
  if (!post) return <div>해당 모집글을 찾을 수 없습니다.</div>;

  return (
    <>
      {/* 배경 고정 */}
      <div className="fixed-background"></div>
      {/* 전체 컨텐츠 영역 */}
      <div className="content">
        {/* 상세 보기 박스 */}
        <div className="writ-box">
          {/* 닫기 버튼 */}
          <button className="close-button" onClick={() => navigate('/study')}>X</button>

          {/* 구분선 */}
          <div className="sepa-line"></div>

          {/* 제목 */}
          <div className="write-title">모집글 상세 정보</div>

          {/* 읽기 전용 입력 폼 */}
          <div className="form-section">
            {/* 제목 */}
            <div className="form-group">
              <label className="form-label">제목</label>
              <input type="text" className="input-box title-input" value={post.title} readOnly />
            </div>

            {/* 모집 인원 */}
            <div className="form-group">
              <label className="form-label">모집 인원</label>
              <input type="text" className="input-box small-input" value={`${post.recruitCount}명`} readOnly />
            </div>

            {/* 모집 날짜 */}
            <div className="form-group">
              <label className="form-label">모집 날짜</label>
              <input type="text" className="input-box small-input" value={post.recruitStart} readOnly />
              <span className="tilde">~</span>
              <input type="text" className="input-box small-input" value={post.recruitEnd} readOnly />
            </div>

            {/* 진행 날짜 */}
            <div className="form-group">
              <label className="form-label">진행 날짜</label>
              <input type="text" className="input-box small-input" value={post.scheduleStart} readOnly />
              <span className="tilde">~</span>
              <input type="text" className="input-box small-input" value={post.scheduleEnd} readOnly />
            </div>

            {/* 기타 내용 */}
            <div className="form-group textarea-group">
              <label className="form-label textarea-label">기타 내용</label>
              <textarea className="input-box textarea-input" value={post.etc} readOnly />
            </div>

            {/* 지원 버튼 (지원 직후엔 숨김) */}
            {!fromApplyStatus && (
              <button className="finish-button" onClick={() => navigate(`/study/appl/${post.id}`)}>
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
