import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../css/Appl.css';

function ViewAppl() {
  const { postId, email } = useParams(); // ✅ URL에서 받음
  const navigate = useNavigate();

  const [applicant, setApplicant] = useState(null);

  useEffect(() => {
    const allApplicants = JSON.parse(localStorage.getItem('applicants')) || [];
    const found = allApplicants.find(app => app.postId === postId && app.applicantEmail === email);
    if (found) {
      setApplicant(found);
    }
  }, [postId, email]);

  if (!applicant) {
    return <div className="appl-form">해당 지원자를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <div className="fixed-background"></div>

      <div className="content">
        <div className="appl-form">
          {/* 🔙 닫기 버튼 */}
          <button className="x-button" onClick={() => navigate(`/applicants/${postId}`)}>
            X
          </button>

          <div className="form-title">지원서 상세 보기</div>
          <div className="appl-line"></div>

          <div className="appl-section">
            <div className="appl-label">학과</div>
            <div className="appl-value">{applicant.department}</div>
          </div>

          <div className="appl-section">
            <div className="appl-label">이름</div>
            <div className="appl-value">{applicant.name}</div>
          </div>

          <div className="appl-section">
            <div className="appl-label">연락처</div>
            <div className="appl-value">{applicant.contact}</div>
          </div>

          <div className="appl-section">
            <div className="appl-label">지원 동기</div>
            <div className="appl-value">{applicant.motivation}</div>
          </div>

          <div className="appl-section">
            <div className="appl-label">포트폴리오 링크</div>
            <div className="appl-value">
              {applicant.portfolioLinks?.map((link, i) => (
                <div key={i}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="appl-section">
            <div className="appl-label">기술 스택</div>
            <div className="appl-value">
              {applicant.techStacks?.map((stack, i) => (
                <span key={i}>{stack}{i < applicant.techStacks.length - 1 ? ', ' : ''}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAppl;
