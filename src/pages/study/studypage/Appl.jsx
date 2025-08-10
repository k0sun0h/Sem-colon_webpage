import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../../css/Appl.css';

function Appl({ dataList }) {
  const navigate = useNavigate();
  const { id } = useParams(); // ← postId
  const [data, setData] = useState(null);

  const [portfolioLinks, setPortfolioLinks] = useState(['']);
  const [techStacks, setTechStacks] = useState(['']);
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [motivation, setMotivation] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('postList')) || [];
    const matched = posts.find(post => String(post.id) === String(id));
    setData(matched || null);
  }, [id, dataList]);

  const handleContactChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    const formatted = value.length > 4
      ? `${value.slice(0, 4)}-${value.slice(4)}`
      : value;
    setContact(formatted);
  };

  const handleClose = () => {
    navigate('/study');
  };

  const handleSubmit = () => {
    if (
      !department.trim() ||
      !name.trim() ||
      !contact.trim() ||
      !motivation.trim()
    ) {
      alert('학과, 이름, 연락처, 지원동기의 항목은 반드시 입력해주세요!');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.email) {
      alert('로그인이 필요합니다.');
      return;
    }

    const existingApplicants = JSON.parse(localStorage.getItem('applicants')) || [];

    const alreadyApplied = existingApplicants.some(app =>
      app.postId === id && app.applicantEmail === user.email
    );

    if (alreadyApplied) {
      alert('이미 이 모집글에 지원하셨습니다.');
      return;
    }

    const applicantData = {
      postId: id,
      applicantEmail: user.email,
      submittedAt: new Date().toISOString(),
      postTitle: data.title,
      name,
      department,
      contact,
      motivation,
      portfolioLinks,
      techStacks
    };

    localStorage.setItem('applicants', JSON.stringify([...existingApplicants, applicantData]));

    alert('지원이 완료되었습니다!');
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
            <div className="appl-title">잘못된 접근입니다</div>
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

          <div className="appl-form-group motivation-group">
            <label className="appl-label motivation-label">지원 동기</label>
            <textarea
              className="appl-input motivation-input"
              placeholder="지원 동기를 입력해주세요"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
            />
          </div>

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

          <button className="finish-button" onClick={handleSubmit}>작성 완료</button>
        </div>
      </div>
    </>
  );
}

export default Appl;