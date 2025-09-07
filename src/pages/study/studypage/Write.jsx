// 페이지 이동용 훅 import
import { useNavigate } from 'react-router-dom';
// 상태 관리용 useState import
import { useState } from 'react';
// 전용 스타일 import
import '../../../css/Write.css';

function Write() { // 기존 prop addFormData는 API 연동으로 미사용이라 제거
  const navigate = useNavigate(); // 페이지 이동 함수

  // 입력 폼의 각 필드 상태 선언
  const [title, setTitle] = useState('');
  const [recruitCount, setRecruitCount] = useState('');
  const [recruitStart, setRecruitStart] = useState('');
  const [recruitEnd, setRecruitEnd] = useState('');
  const [scheduleStart, setScheduleStart] = useState('');
  const [scheduleEnd, setScheduleEnd] = useState('');
  const [etc, setEtc] = useState('');
  const [submitting, setSubmitting] = useState(false); // [추가] 제출 중 상태

  // X 버튼을 눌렀을 때 처리하는 함수
  const handleClose = () => {
    navigate('/study'); // 스터디 페이지로 이동
  };

  // 작성 완료 버튼 클릭 시 호출되는 함수
  const handleSubmit = async () => {
    // 제목, 인원, 기간, 기타 내용이 모두 입력되었는지 검사
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

    // 로그인 여부 검사
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    try {
      setSubmitting(true);

      // [추가] 작성 API 호출 (문서 스펙에 맞춰 전송)
      await fetch('/api/study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          personnel: Number(recruitCount),
          // 문자열 범위로 전달 (백엔드와 start/end 구조 협의 가능)
          recruitDate: `${recruitStart} ~ ${recruitEnd}`,
          progressDate: `${scheduleStart} ~ ${scheduleEnd}`,
          content: etc,
        }),
      });

      alert('작성 완료되었습니다.');
      navigate('/study', { replace: true });
    } catch (e) {
      alert(e.message || '등록에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* 배경 고정 */}
      <div className="fixed-background"></div>
      {/* 전체 컨텐츠 영역 */}
      <div className="content">
        {/* 작성 폼 박스 */}
        <div className="writ-box">
          {/* 닫기 버튼 */}
          <button className="close-button" onClick={handleClose}>X</button>

          {/* 구분선 */}
          <div className="sepa-line"></div>

          {/* 제목 */}
          <div className="write-title">작성 양식</div>

          {/* 폼 섹션 */}
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

            {/* 모집 인원 */}
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

            {/* 모집 날짜 */}
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

            {/* 진행 날짜 */}
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

            {/* 기타 내용 */}
            <div className="form-group textarea-group">
              <label className="form-label textarea-label">기타 내용</label>
              <textarea
                className="input-box textarea-input"
                value={etc}
                onChange={(e) => setEtc(e.target.value)}
              />
            </div>

            {/* 작성 완료 버튼 */}
            <button className="finish-button" onClick={handleSubmit} disabled={submitting}>
              {submitting ? '처리 중…' : '작성 완료'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Write;
