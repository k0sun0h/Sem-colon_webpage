// react-router-dom에서 페이지 이동(navigate)과 파라미터(useParams)를 가져옴
import { useNavigate, useParams } from 'react-router-dom';
// React의 useState 훅 사용
import { useState } from 'react';
// 스타일시트 import
import '../../../css/Appl.css';

function Appl({ dataList }) {
  const navigate = useNavigate();           // 페이지 이동을 위한 navigate 함수
  const { index } = useParams();            // URL 파라미터(index)를 가져옴
  const data = dataList[parseInt(index)];   // index를 숫자로 변환하여 해당 data를 선택

  // 입력 폼 상태 선언
  const [portfolioLinks, setPortfolioLinks] = useState(['']); // 포트폴리오 링크 배열
  const [techStacks, setTechStacks] = useState(['']);         // 기술 스택 배열
  const [department, setDepartment] = useState('');           // 학과
  const [studentId, setStudentId] = useState('');             // 학번
  const [name, setName] = useState('');                       // 이름
  const [motivation, setMotivation] = useState('');           // 지원 동기

  // 연락처 상태
  const [contact, setContact] = useState('');

  // 연락처 입력 핸들러: 숫자만 입력받고, 중간에 하이픈 자동 삽입
  const handleContactChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    if (value.length > 8) value = value.slice(0, 8);   // 최대 8자리까지 입력 허용

    const formatted = value.length > 4
      ? `${value.slice(0, 4)}-${value.slice(4)}`       // 4-4 형태로 변환
      : value;

    setContact(formatted);                             // 상태 업데이트
  };

  // 닫기 버튼 클릭 시 study 홈으로 이동
  const handleClose = () => {
    navigate('/study');
  };

  // 유효하지 않은 index이거나 data가 없을 경우 기본 UI 렌더링
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
          {/* 닫기 버튼 */}
          <button className="close-button" onClick={handleClose}>X</button>
          {/* 상단 구분선 */}
          <div className="sepa-line"></div>
          {/* 상단 제목 */}
          <div className="appl-title">{data.title} - 지원하기</div>

          {/* 기본 정보 입력란 (학과, 학번, 이름, 연락처) */}
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
            </div>
          </div>

          {/* 지원 동기 입력란 */}
          <div className="appl-form-group motivation-group">
            <label className="appl-label motivation-label">지원 동기</label>
            <textarea
              className="appl-input motivation-input"
              placeholder="지원 동기를 입력해주세요"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
            />
          </div>

          {/* 포트폴리오 링크 입력란 (복수 추가 가능) */}
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

              {/* 첫 번째 입력란에만 + 버튼 표시 */}
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

          {/* 사용 가능한 기술 스택 입력란 (복수 추가 가능) */}
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

              {/* 첫 번째 입력란에만 + 버튼 표시 */}
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

          {/* 작성 완료 버튼: 필수 항목 누락 시 경고 */}
          <button
            className="finish-button"
            onClick={() => {
              if (
                !department.trim() ||
                !studentId.trim() ||
                !name.trim() ||
                !contact.trim() ||
                !motivation.trim()
              ) {
                alert('학과, 학번, 이름, 연락처, 지원동기의 항목은 반드시 입력해주세요!');
                return;
              }
              navigate('/study'); // 입력 완료 후 스터디 홈으로 이동
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
