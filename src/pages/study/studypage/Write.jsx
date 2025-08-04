// 페이지 이동용 훅 import
import { useNavigate } from 'react-router-dom';
// 상태 관리용 useState import
import { useState } from 'react';
// 전용 스타일 import
import '../../../css/Write.css';

function Write({ addFormData }) {
  const navigate = useNavigate(); // 페이지 이동 함수

  // 입력 폼의 각 필드 상태 선언
  const [title, setTitle] = useState('');
  const [recruitCount, setRecruitCount] = useState('');
  const [recruitStart, setRecruitStart] = useState('');
  const [recruitEnd, setRecruitEnd] = useState('');
  const [scheduleStart, setScheduleStart] = useState('');
  const [scheduleEnd, setScheduleEnd] = useState('');
  const [etc, setEtc] = useState('');

  // X 버튼 클릭 시 홈으로 이동
  const handleClose = () => {
    navigate('/study');
  };

  // 작성 완료 버튼 클릭 시 유효성 검사 후 등록
  const handleSubmit = () => {
    if (
      !title.trim() ||
      !recruitCount.trim() ||
      !recruitStart.trim() || !recruitEnd.trim() ||
      !scheduleStart.trim() || !scheduleEnd.trim() ||
      !etc.trim()
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.email) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    // ✅ 여기서 한 번만 id 생성
    const id = crypto.randomUUID();

    const newPost = {
      id,
      title,
      recruitCount,
      recruitStart,
      recruitEnd,
      scheduleStart,
      scheduleEnd,
      email: user.email,
      etc,
    };

    const existingPosts = JSON.parse(localStorage.getItem('postList')) || [];
    const updatedPosts = [...existingPosts, newPost];
    localStorage.setItem('postList', JSON.stringify(updatedPosts));

    // ✅ 동일한 newPost 전달
    addFormData(newPost);

    alert("작성 완료되었습니다.");
    navigate('/study');
  };

  return (
    <>
      {/* 고정 배경 및 반투명 오버레이 */}
      <div className="fixed-background"></div>

      {/* 실제 입력 콘텐츠 */}
      <div className="content">
        <div className="writ-box">
          {/* 닫기 버튼 */}
          <button className="close-button" onClick={handleClose}>X</button>

          {/* 상단 구분선 */}
          <div className="sepa-line"></div>

          {/* 제목 */}
          <div className="write-title">작성 양식</div>

          {/* 입력 폼 영역 */}
          <div className="form-section">

            {/* 제목 입력 */}
            <div className="form-group">
              <label className="form-label">제목</label>
              <input
                type="text"
                className="input-box title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* 모집 인원 입력 */}
            <div className="form-group">
              <label className="form-label">모집 인원</label>
              <input
                type="number"
                min="2"
                className="input-box small-input"
                value={recruitCount}
                onChange={(e) => setRecruitCount(e.target.value)}
              />
            </div>

            {/* 모집 날짜 입력 */}
            <div className="form-group">
              <label className="form-label">모집 날짜</label>
              <input
                type="date"
                className="input-box small-input"
                value={recruitStart}
                onChange={(e) => setRecruitStart(e.target.value)}
              />
              <span className="tilde">~</span>
              <input
                type="date"
                className="input-box small-input"
                value={recruitEnd}
                onChange={(e) => setRecruitEnd(e.target.value)}
              />
            </div>

            {/* 진행 날짜 입력 */}
            <div className="form-group">
              <label className="form-label">진행 날짜</label>
              <input
                type="date"
                className="input-box small-input"
                value={scheduleStart}
                onChange={(e) => setScheduleStart(e.target.value)}
              />
              <span className="tilde">~</span>
              <input
                type="date"
                className="input-box small-input"
                value={scheduleEnd}
                onChange={(e) => setScheduleEnd(e.target.value)}
              />
            </div>

            {/* 기타 내용 입력 */}
            <div className="form-group textarea-group">
              <label className="form-label textarea-label">기타 내용</label>
              <textarea
                className="input-box textarea-input"
                value={etc}
                onChange={(e) => setEtc(e.target.value)}
              />
            </div>

            {/* 작성 완료 버튼 */}
            <button className="finish-button" onClick={handleSubmit}>작성 완료</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Write;
