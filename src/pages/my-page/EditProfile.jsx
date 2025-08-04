import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/SignUp.css';

function EditProfile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};

  const [name, setName] = useState(storedUser.name || '');
  const [major, setMajor] = useState(storedUser.major || '');
  const [email, setEmail] = useState(storedUser.email || ''); // 변경 불가
  const [password, setPassword] = useState(storedUser.password || '');
  const [passwordConfirm, setPasswordConfirm] = useState(storedUser.password || '');
  const [profileImage, setProfileImage] = useState(storedUser.profileImage || null);

  const validatePassword = (pw) => ({
    length: pw.length >= 8,
    number: /\d/.test(pw),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(pw),
  });

  const passwordValidation = validatePassword(password);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!passwordValidation.length || !passwordValidation.number || !passwordValidation.special) {
      alert("비밀번호 형식이 올바르지 않습니다.");
      return;
    }

    const updatedUser = {
      ...storedUser,
      name,
      major,
      password,
      profileImage,
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem('registeredUser', JSON.stringify(updatedUser)); // ✅ 추가
    window.dispatchEvent(new Event("storage")); // 💡 상태 동기화 트리거

    alert("정보가 성공적으로 수정되었습니다.");
    navigate('/'); // 메인 페이지로 이동 (필요에 따라 수정)
  };

  return (
    <>
      <div className="login-background" />
      <div className="signup-container">
        <div className="signup-box">
          <h2 className="login-title">회원 정보 수정</h2>
          <div className='signup-contents'>
            <div className="signup-left">
              <label className="photo-label">프로필 사진</label>
              <div className="photo-preview-wrapper">
                {profileImage ? (
                  <img src={profileImage} alt="미리보기" className="photo-preview" />
                ) : (
                  <div className="photo-placeholder" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="photo-input"
              />
            </div>

            <div className="signup-right">
              <div className="login-inputs">
                <label>이 름</label>
                <input
                  type="text"
                  value={name}
                  className="login-input"
                  onChange={(e) => setName(e.target.value)}
                />
                <label>학 과</label>
                <input
                  type="text"
                  value={major}
                  className="login-input"
                  onChange={(e) => setMajor(e.target.value)}
                />
                <label>이 메 일</label>
                <input
                  type="email"
                  value={email}
                  className="login-input"
                  readOnly
                  style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }}
                />
                <label>비밀번호</label>
                <input
                  type="password"
                  value={password}
                  className="login-input"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="password-checks">
                  <p className={passwordValidation.length ? 'pass' : 'fail'}>8자 이상</p>
                  <p className={passwordValidation.number ? 'pass' : 'fail'}>숫자 포함</p>
                  <p className={passwordValidation.special ? 'pass' : 'fail'}>특수문자 포함</p>
                </div>
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  value={passwordConfirm}
                  className="login-input"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
              <button className="signup-button" onClick={handleUpdate}>
                변 경 완 료
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
