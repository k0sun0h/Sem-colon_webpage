import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../../css/Write.css';

function Write({ addFormData }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [recruitCount, setRecruitCount] = useState('');
  const [recruitStart, setRecruitStart] = useState('');
  const [recruitEnd, setRecruitEnd] = useState('');
  const [scheduleStart, setScheduleStart] = useState('');
  const [scheduleEnd, setScheduleEnd] = useState('');
  const [etc, setEtc] = useState('');

  const handleClose = () => {
    navigate('/study');
  };

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

    addFormData({
      title,
      recruitCount,
      recruitStart,
      recruitEnd,
      scheduleStart,
      scheduleEnd
    });
    navigate('/study');
  };

  return (
    <>
      <div className="fixed-background"></div>
      <div className="content">
        <div className="write-box">
          <button className="close-button" onClick={handleClose}>X</button>
          <div className="sepa-line"></div>
          <div className="write-title">작성 양식</div>
          <div className="form-section">

            <div className="form-group">
              <label className="form-label">제목</label>
              <input type="text" className="input-box title-input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">모집 인원</label>
              <input type="number" min="2" className="input-box small-input" value={recruitCount} onChange={(e) => setRecruitCount(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">모집 날짜</label>
              <input type="date" className="input-box small-input" value={recruitStart} onChange={(e) => setRecruitStart(e.target.value)} />
              <span className="tilde">~</span>
              <input type="date" className="input-box small-input" value={recruitEnd} onChange={(e) => setRecruitEnd(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">진행 날짜</label>
              <input type="date" className="input-box small-input" value={scheduleStart} onChange={(e) => setScheduleStart(e.target.value)} />
              <span className="tilde">~</span>
              <input type="date" className="input-box small-input" value={scheduleEnd} onChange={(e) => setScheduleEnd(e.target.value)} />
            </div>

            <div className="form-group textarea-group">
              <label className="form-label textarea-label">기타 내용</label>
              <textarea className="input-box textarea-input" value={etc} onChange={(e) => setEtc(e.target.value)} />
            </div>

            <button className="finish-button" onClick={handleSubmit}>작성 완료</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Write;
