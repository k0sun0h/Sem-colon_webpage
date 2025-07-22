// 파일 위치: src/pages/members/add/AddMember.jsx

import '../../members/Members.css';
import '../../../../src/css/AddMember.css';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ 추가
import { useState } from 'react';

function AddMember({ setCurrentMembers, setGraduatedMembers }) {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ 추가
  const category = location.state?.category || '현재 부원'; // ✅ 현재 탭

  const [name, setName] = useState('');
  const [part, setPart] = useState('');
  const [intro, setIntro] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [contact, setContact] = useState('');
  const [photo, setPhoto] = useState(null);

  // ✅ [1] base64 변환 함수 추가
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
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
            <div className="photo-upload-wrapper">
              <label htmlFor="photo-upload" className="photo-circle">
                사진 추가
              </label>
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPhoto(file); // ✅ 유지
                    console.log('선택된 파일:', file.name);
                  }
                }}
              />
            </div>

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

          <button
            className="submit-button"
            onClick={async () => { // ✅ async로 수정
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

              const base64Image = await fileToBase64(photo); // ✅ [2] 이미지 변환

              const newMember = {
                name,
                part,
                description: intro,
                portfolio,
                contact,
                image: base64Image, // ✅ [3] 변환된 base64 저장
              };

              if (category === '현재 부원') {
                setCurrentMembers((prev) => [...prev, newMember]);
              } else if (category === '졸업 부원') {
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
