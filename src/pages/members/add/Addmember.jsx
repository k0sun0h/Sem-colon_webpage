// 스타일 시트 import
import '../../../css/Members.css';              // 공통 스타일
import '../../../../src/css/AddMember.css';      // 추가 입력 전용 스타일

// 라우팅 및 상태 훅 import
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function AddMember({ setCurrentMembers, setGraduatedMembers }) {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category || '현재 부원';

  // 입력 폼 상태
  const [name, setName] = useState('');
  const [part, setPart] = useState('');
  const [intro, setIntro] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [contact, setContact] = useState('');
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // 🔥 추가: 미리보기용

  // 파일을 base64 문자열로 변환하는 함수
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      {/* ← 버튼 */}
      <button
        className="add-member-button"
        onClick={() => navigate('/members', { state: { category } })}
      >
        ←
      </button>

      <div className="fixed-background" />

      <div className="add-container">
        <div className="add-box">
          <h2 className="add-title">부원 등록</h2>

          <div className="add-content">
            {/* 사진 업로드 */}
            <div className="photo-upload-wrapper">
              <label htmlFor="photo-upload" className="photo-circle">
                {previewUrl ? (
                  <img src={previewUrl} alt="미리보기" className="photo-preview" />
                ) : (
                  '사진 추가'
                )}
              </label>
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const base64 = await fileToBase64(file);
                    setPhoto(file);
                    setPreviewUrl(base64);
                  }
                }}
              />
            </div>

            {/* 입력 폼 */}
            <div className="form-wrapper">
              <div className="form-row">
                <label>이 름</label>
                <input
                  type="text"
                  className="input-box small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="part-wrapper">
                  <label>파 트</label>
                  <input
                    type="text"
                    className="input-box small"
                    value={part}
                    onChange={(e) => setPart(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <label>{category === '졸업 부원' ? '취업 회사' : '한 줄 소개'}</label>
                <input
                  type="text"
                  className="input-box long"
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label>포트폴리오</label>
                <input
                  type="text"
                  className="input-box medium"
                  placeholder="url을 입력해주세요"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                />
                <label>연 락 처</label>
                <input
                  type="text"
                  className="input-box medium"
                  placeholder="  -  포함해서 입력해주세요"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 등록 버튼 */}
          <button
            className="submit-button"
            onClick={async () => {
              if (
                !name.trim() ||
                !part.trim() ||
                !intro.trim() ||
                !portfolio.trim() ||
                !contact.trim() ||
                !photo
              ) {
                alert('빈칸을 모두 채워주세요');
                return;
              }

              const base64Image = await fileToBase64(photo);

              const newMember = {
                name,
                part,
                description: intro,
                portfolio,
                contact,
                image: base64Image,
              };

              if (category === '현재 부원') {
                setCurrentMembers((prev) => [...prev, newMember]);
              } else {
                setGraduatedMembers((prev) => [...prev, newMember]);
              }

              alert('등록 완료!');
              navigate('/members', { state: { category } });
            }}
          >
            등 록
          </button>
        </div>
      </div>
    </>
  );
}

export default AddMember;
