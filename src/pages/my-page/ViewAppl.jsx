// src/pages/my-page/ViewAppl.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../css/Appl.css';

function ViewAppl() {
  const { postId, email } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('applicants')) || [];
    const found = all.find(a => String(a.postId) === String(postId) && a.applicantEmail === email);
    setApplicant(found || null);
  }, [postId, email]);

  const goBack = () => navigate(`/applicants/${postId}`);

  if (!applicant) {
    return (
      <>
        <div className="fixed-background" />
        <div className="content">
          <div className="write-box">
            <button className="close-button" onClick={goBack}>X</button>
            <div className="sepa-line"></div>
            <div className="appl-title">해당 지원자를 찾을 수 없습니다</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed-background" />
      <div className="content">
        <div className="write-box">
          <button className="close-button" onClick={goBack}>X</button>
          <div className="sepa-line"></div>
          <div className="appl-title">{applicant.postTitle} - 지원서 열람</div>

          {/* 기본 정보 */}
          <div className="appl-form">
            <div className="appl-form-group">
              <label className="appl-label">학과</label>
              <input className="appl-input" value={applicant.department || ''} readOnly disabled />

              <label className="appl-label">이름</label>
              <input className="appl-input" value={applicant.name || ''} readOnly disabled />

              <label className="appl-label">연락처</label>
              <div className="contact-input-group">
                <span className="contact-prefix">010 - </span>
                <input className="contact-input" value={applicant.contact || ''} readOnly disabled />
              </div>
            </div>
          </div>

          {/* 지원 동기 */}
          <div className="appl-form-group motivation-group">
            <label className="appl-label motivation-label">지원 동기</label>
            <textarea
              className="appl-input motivation-input"
              value={applicant.motivation || ''}
              readOnly
              disabled
            />
          </div>

          {/* 포트폴리오 링크 (링크로 표시) */}
          <div className="appl-form-group portfolio-group">
            <label className="appl-label portfolio-label">포트폴리오 링크 (프로젝트 지원자만)</label>
            <div className="portfolio-wrapper">
              {(applicant.portfolioLinks && applicant.portfolioLinks.length > 0
                ? applicant.portfolioLinks
                : []
              ).map((link, i) => (
                <div key={i}>
                  <a className="portfolio-link" href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* 기술 스택 (텍스트로 표시) */}
          <div className="appl-form-group stack-group">
            <label className="appl-label stack-label">사용 가능한 기술 스택 (프로젝트 지원자만)</label>
            <div className="stack-value">
              {(applicant.techStacks && applicant.techStacks.length > 0
                ? applicant.techStacks
                : []
              ).join(', ')}
            </div>
          </div>

          {/* ✅ 작성 완료 버튼 없음 */}
        </div>
      </div>
    </>
  );
}

export default ViewAppl;
