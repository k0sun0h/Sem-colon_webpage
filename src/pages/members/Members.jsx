// 상태 및 페이지 이동을 위한 훅
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// 스타일시트 import
import './Members.css';

function Members({ currentMembers, graduatedMembers }) {
  const navigate = useNavigate();            // 페이지 이동 함수
  const location = useLocation();            // 현재 페이지 위치 정보

  // 탭 상태 초기화 (URL state로부터 category를 받을 수도 있음)
  const [category, setCategory] = useState(location.state?.category || '운영진');

  // 각 카테고리별 멤버 데이터 구성
  const memberData = { 
    운영진: [
      {
        name: '홍길동',
        position: '회장',
        description: '책임감 있고 뛰어난 리더십의 PM',
        part: '프론트엔드',
        contact: '010-XXXX-XXXX',
        portfolio: 'https://example.com/hong',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC3VqzAwDdyNtTWgitKl6IhyjHlJzjENeEEQ&s',
      },
      {
        name: '임꺽정',
        position: '부회장',
        description: '통찰력 있고 활발한 소통의 PM',
        part: '백엔드',
        contact: '010-XXXX-XXXX',
        portfolio: 'https://example.com/lim',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxydJ04EO4RH4EDaRxuMjuOZ037pMmpOrrBg&s',
      },
      {
        name: '최철수',
        position: '부회장',
        description: '기획과 넓은 지식의 PM',
        part: '기획',
        contact: '010-XXXX-XXXX',
        portfolio: 'https://example.com/choi',
        image: 'data:image/jpeg;base64,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',
      },
      {
        name: '짱구',
        position: '부회장',
        description: '뛰어난 창의력의 PM',
        part: '디자인',
        contact: '010-XXXX-XXXX',
        portfolio: 'https://example.com/jjanggu',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvf-nhjPBwckIrCzIS5-gWLpezrRNUkwyjxw&s',
      },
    ],
    '현재 부원': currentMembers,     // 부모 컴포넌트에서 전달된 데이터
    '졸업 부원': graduatedMembers,   // 부모 컴포넌트에서 전달된 데이터
  };

  return (
    <>
      {/* 배경 이미지 */}
      <div className="fix-background"></div>

      {/* 전체 멤버 영역 */}
      <div className="members-wrapper">
        {/* 카테고리 탭 버튼 */}
        <div className="members-category">
          {['운영진', '현재 부원', '졸업 부원'].map((label) => (
            <button
              key={label}
              className={`members-tab ${category === label ? 'active' : ''}`}
              onClick={() => setCategory(label)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 멤버 카드 그리드 */}
        <div className="members-grid">
          {/* 선택된 카테고리의 멤버가 없을 경우 */}
          {memberData[category].length === 0 ? (
            <div className="empty-message">아직 등록된 멤버가 없습니다.</div>
          ) : (
            memberData[category].map((member, idx) => (
              <div className="member-card" key={idx}>
                {/* 좌측 이미지 */}
                <div className="member-left">
                  <img src={member.image} alt={member.name} className="member-image" />
                </div>
                {/* 우측 정보 영역 */}
                <div className="member-right">
                  <div className="member-name">{member.name}</div>
                  <div className="member-role">
                    {category === '졸업 부원' ? '졸업생' : member.position || '부원'}
                  </div>
                  <div className="member-desc">{member.description}</div>
                  <div className="member-part">파트: {member.part}</div>
                  <div className="member-footer">
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="portfolio-link"
                    >
                      포트폴리오 보기
                    </a>
                    <span className="contact">{member.contact}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* '현재 부원' 또는 '졸업 부원' 탭일 때만 + 버튼 표시 */}
      {(category === '현재 부원' || category === '졸업 부원') && (
        <button
         className="add-member-button"
         onClick={() => {
         const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
          alert('로그인 후 이용해주세요.');
        return;
        }
         navigate('/members/add', { state: { category } });
        }}
        >
        ＋
        </button>

      )}
    </>
  );
}

export default Members;
