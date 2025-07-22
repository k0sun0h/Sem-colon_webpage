import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import '../../../css/Appl.css';

function Appl({ dataList }) {
  const navigate = useNavigate();
  const { index } = useParams();
  const data = dataList[parseInt(index)];
  const [portfolioLinks, setPortfolioLinks] = useState(['']);
  const [techStacks, setTechStacks] = useState(['']);
  const [department, setDepartment] = useState('');
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [motivation, setMotivation] = useState('');




  // 연락처 상태
  const [contact, setContact] = useState('');

  // 연락처 입력 핸들러: 숫자만 입력 + 하이픈 자동 삽입
  const handleContactChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만
    if (value.length > 8) value = value.slice(0, 8);   // 8자리 제한

    const formatted = value.length > 4
      ? `${value.slice(0, 4)}-${value.slice(4)}`
      : value;

    setContact(formatted);
  };

  // 닫기
  const handleClose = () => {
    navigate('/study');
  };

  if (!data) {
    return (
      <>
        <div className="fixed-background"></div>
        <div className="content">
          <div className="write-box">
            <button className="close-button" onClick={handleClose}>X</button>
            <div className="sepa-line"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed-background"></div>
      <div className="content">
        <div className="write-box">
          <button className="close-button" onClick={handleClose}>X</button>
          <div className="sepa-line"></div>
          <div className="appl-title">{data.title} - 지원하기</div>

          <div className="appl-form">
            <div className="appl-form-group">
              <label className="appl-label">학과</label>
              <input
  type="text"
  className="appl-input"
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
/>


              <label className="appl-label">학번</label>
                <input
  type="text"
  className="appl-input"
  value={studentId}
  onChange={(e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    setStudentId(onlyNums);
  }}
/>


              <label className="appl-label">이름</label>
              <input
  type="text"
  className="appl-input"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>


              <label className="appl-label">연락처</label>
              <div className="contact-input-group">
                <span className="contact-prefix">010 - </span>
                <input
                  type="text"
                  className="contact-input"
                  placeholder="1234 - 5678"
                  value={contact}
                  onChange={handleContactChange}
                />
              </div>
              {/* 지원 동기 입력란 */}


            </div>
          </div>
          <div className="appl-form-group motivation-group">
  <label className="appl-label motivation-label">지원 동기</label>
  <textarea
  className="appl-input motivation-input"
  placeholder="지원 동기를 입력해주세요"
  value={motivation}
  onChange={(e) => setMotivation(e.target.value)}
/>

</div>
{/* 포트폴리오 링크 입력란 */}
{portfolioLinks.map((link, idx) => (
  <div className="appl-form-group portfolio-group" key={`portfolio-${idx}`}>
    {idx === 0 ? (
      <label className="appl-label portfolio-label">
        포트폴리오 링크 (프로젝트 지원자만)
      </label>
    ) : (
      <div className="portfolio-label-spacer" />
    )}

    <input
      type="text"
      className="appl-input portfolio-input"
      value={link}
      onChange={(e) => {
        const newLinks = [...portfolioLinks];
        newLinks[idx] = e.target.value;
        setPortfolioLinks(newLinks);
      }}
      placeholder="URL을 입력해주세요"
    />

    {/* ✅ 버튼은 첫 줄에만! */}
    {idx === 0 && (
      <button
        className="add-button"
        onClick={() => setPortfolioLinks([...portfolioLinks, ''])}
      >
        +
      </button>
    )}
  </div>
))}




{/* 사용 가능한 기술 스택 입력란 */}
{techStacks.map((stack, idx) => (
  <div className="appl-form-group stack-group" key={`stack-${idx}`}>
    {idx === 0 ? (
      <label className="appl-label stack-label">
        사용 가능한 기술 스택 (프로젝트 지원자만)
      </label>
    ) : (
      <div className="stack-label-spacer" />
    )}

    <input
      type="text"
      className="appl-input stack-input"
      value={stack}
      onChange={(e) => {
        const newStacks = [...techStacks];
        newStacks[idx] = e.target.value;
        setTechStacks(newStacks);
      }}
      placeholder="예: React, Node.js, Figma 등"
    />

    {/* ✅ 버튼은 첫 번째 줄에만 고정 */}
    {idx === 0 && (
      <button
        className="add-button"
        onClick={() => setTechStacks([...techStacks, ''])}
      >
        +
      </button>
    )}
  </div>
))}
<button
  className="finish-button"
  onClick={() => {
    if (
      !department.trim() ||
      !studentId.trim() ||
      !name.trim() ||
      !contact.trim() ||         // ✅ 연락처 미입력 시도 포함
      !motivation.trim()
    ) {
      alert('학과, 학번, 이름, 연락처, 지원동기의 항목은 반드시 입력해주세요!');
      return;
    }
    navigate('/study');
  }}
>
  작성 완료
</button>



        </div>
        
      </div>
    </>
  );
}

export default Appl;
