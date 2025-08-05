import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../css/Appl.css'; // 기존 Appl.css 재사용

function ViewAppl() {
  const { postId, email } = useParams();
  const [applicant, setApplicant] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const applicants = JSON.parse(localStorage.getItem('applicants')) || [];
    const matched = applicants.find(
      (a) => a.postId === postId && a.applicantEmail === email
    );
    setApplicant(matched);
  }, [postId, email]);

  if (!applicant) {
    return (
      <div className="fixed-background">
        <div className="content">
          <div className="write-box">
            <div className="appl-title">지원서를 찾을 수 없습니다.</div>
          </div>
        </div>
      </div>
    );
  }
  

  return (
    <>
      <div className="fixed-background"></div>
      <div className="content">
        <div className="write-box">
          <button className="close-button" onClick={() => navigate(`/applicants/${postId}`)}>X</button>

          <div className="appl-title">지원서 열람</div>

          <div className="appl-form">
            <div className="appl-form-group">
              <label className="appl-label">학과</label>
              <input
                type="text"
                className="appl-input"
                value={applicant.department || ''}
                disabled
              />

              <label className="appl-label">이름</label>
              <input
                type="text"
                className="appl-input"
                value={applicant.name || ''}
                disabled
              />

              <label className="appl-label">연락처</label>
              <div className="contact-input-group">
                <span className="contact-prefix">010 - </span>
                <input
                  type="text"
                  className="contact-input"
                  value={applicant.contact || ''}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="appl-form-group motivation-group">
            <label className="appl-label motivation-label">지원 동기</label>
            <textarea
              className="appl-input motivation-input"
              value={applicant.motivation || ''}
              disabled
            />
          </div>

         {applicant.portfolioLinks?.map((link, idx) => (
          <div className="appl-form-group portfolio-group" key={`port-${idx}`}>
            <label className="appl-label portfolio-label">
              포트폴리오 링크 (프로젝트 지원자만)
              </label>
              <div className="portfolio-wrapper">
                <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-link"
                >
                  {link}
                  </a>
                  </div>
                  </div>
                ))}

          {applicant.techStacks?.map((stack, idx) => (
            <div className="appl-form-group stack-group" key={`stack-${idx}`}>
              <label className="appl-label stack-label">사용 가능한 기술 스택 (프로젝트 지원자만)</label>
              <input
                type="text"
                className="appl-input stack-input"
                value={stack}
                disabled
              />
            </div>
          ))}

          {/* 작성 완료 버튼 제거됨 */}
        </div>
      </div>
    </>
  );
}

export default ViewAppl;
