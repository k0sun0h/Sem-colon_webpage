import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../../css/Appl.css';

function Appl({ dataList }) {
  const navigate = useNavigate(); // 페이지 이동 함수
  const { id } = useParams();     // URL에서 id 추출
  const [data, setData] = useState(null); // 상세 데이터 상태

  // 포트폴리오 링크 입력 상태
  const [portfolioLinks, setPortfolioLinks] = useState(['']);
  // 사용 가능한 기술 스택 입력 상태
  const [techStacks, setTechStacks] = useState(['']);
  // 학과 입력 상태
  const [department, setDepartment] = useState('');
  // 이름 입력 상태
  const [name, setName] = useState('');
  // 지원동기 입력 상태
  const [motivation, setMotivation] = useState('');
  // 연락처 입력 상태 (예: 1234-5678)
  const [contact, setContact] = useState('');

  // 목록에서 선택된 글 찾기
  useEffect(() => {
    const matched = (dataList || []).find((post) => String(post.id) === String(id));
    setData(matched || null);
  }, [id, dataList]);

  // 연락처 입력 포맷팅 (숫자만 허용, 4자리-4자리)
  const handleContactChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    const formatted = value.length > 4
      ? `${value.slice(0, 4)}-${value.slice(4)}`
      : value;
    setContact(formatted);
  };

  // 닫기 버튼 처리
  const handleClose = () => navigate('/study');

  // 작성 완료(지원) 버튼 처리
  const handleSubmit = async () => {
    // 필수 입력값 체크
    if (!department.trim() || !name.trim() || !contact.trim() || !motivation.trim()) {
      alert('학과, 이름, 연락처, 지원동기의 항목은 반드시 입력해주세요!');
      return;
    }

    // 로그인 여부 검사
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      // 연락처 숫자만 추출(8자리) 후 앞자리에 010 붙이기
      const digits = contact.replace(/\D/g, '');
      const fullNumber = `010${digits}`;

      // [추가] 지원 API 호출
      await fetch(`/api/study/${id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          department,
          name,
          phoneNumber: Number(fullNumber), // 문서에서 Int로 명시됨
          motivation,
          portfolio: (portfolioLinks || []).filter(Boolean).join(', '),
          tool: (techStacks || []).filter(Boolean),
        }),
      });

      alert('지원이 완료되었습니다!');
      navigate('/study', { replace: true });
    } catch (e) {
      alert(e.message || '지원에 실패했습니다.');
    }
  };

  if (!data) {
    return (
      <>
        <div className="fixed-background"></div>
        <div className="content">
          <div className="write-box">
            <button className="close-button" onClick={handleClose}>X</button>
            <div className="sepa-line"></div>
            <div className="appl-title">잘못된 접근입니다</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* 배경 고정 */}
      <div className="fixed-background"></div>
      {/* 전체 컨텐츠 영역 */}
      <div className="content">
        {/* 작성 폼 박스 */}
        <div className="write-box">
          {/* 닫기 버튼 */}
          <button className="close-button" onClick={handleClose}>X</button>
          {/* 구분선 */}
          <div className="sepa-line"></div>
          {/* 제목 */}
          <div className="appl-title">{data.title} - 지원하기</div>

          {/* 기본 정보 입력 */}
          <div className="appl-form">
            <div className="appl-form-group">
              <label className="appl-label">학과</label>
              <input type="text" className="appl-input" value={department} onChange={(e) => setDepartment(e.target.value)} />

              <label className="appl-label">이름</label>
              <input type="text" className="appl-input" value={name} onChange={(e) => setName(e.target.value)} />

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

          {/* 지원동기 */}
          <div className="appl-form-group motivation-group">
            <label className="appl-label motivation-label">지원 동기</label>
            <textarea
              className="appl-input motivation-input"
              placeholder="지원 동기를 입력해주세요"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
            />
          </div>

          {/* 포트폴리오 링크(동적 추가) */}
          {portfolioLinks.map((link, idx) => (
            <div className="appl-form-group portfolio-group" key={`portfolio-${idx}`}>
              {idx === 0 ? (
                <label className="appl-label portfolio-label">포트폴리오 링크 (프로젝트 지원자만)</label>
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
              {idx === 0 && (
                <button className="add-button" onClick={() => setPortfolioLinks([...portfolioLinks, ''])}>+</button>
              )}
            </div>
          ))}

          {/* 기술 스택(동적 추가) */}
          {techStacks.map((stack, idx) => (
            <div className="appl-form-group stack-group" key={`stack-${idx}`}>
              {idx === 0 ? (
                <label className="appl-label stack-label">사용 가능한 기술 스택 (프로젝트 지원자만)</label>
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
              {idx === 0 && (
                <button className="add-button" onClick={() => setTechStacks([...techStacks, ''])}>+</button>
              )}
            </div>
          ))}

          {/* 작성 완료 버튼 */}
          <button className="finish-button" onClick={handleSubmit}>작성 완료</button>
        </div>
      </div>
    </>
  );
}

export default Appl;
