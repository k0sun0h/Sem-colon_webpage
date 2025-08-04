import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SignUp.css';

function Signup() {
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  const validatePassword = (pw) => {
    return {
      length: pw.length >= 8,
      number: /\d/.test(pw),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pw),
    };
  };

  const passwordValidation = validatePassword(password);

  const handleSendEmail = () => {
    alert("인증 메일이 전송되었습니다.");
    setEmailVerified(true);
  };

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



  const handleSignup = () => {
    if (!emailVerified) {
      alert("이메일 인증이 필요합니다.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!passwordValidation.length || !passwordValidation.number || !passwordValidation.special) {
      alert("비밀번호 형식이 올바르지 않습니다.");
      return;
    }

    const userData = {
      name,
      major,
      email,
      password,
      profileImage,
    };

    localStorage.setItem('registeredUser', JSON.stringify(userData));
    alert("회원가입 완료! 로그인 페이지로 이동합니다.");
    navigate('/login');
  };

  return (
    <>
      <div className="login-background" />
        <div className="signup-container">
          <div className="signup-box">
            <h2 className="login-title">회원가입</h2>
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
                <div className="email-verification">
                  <input
                    type="email"
                    value={email}
                    className="login-input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={handleSendEmail}>인증</button>
                </div>
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
              <button className="signup-button" onClick={handleSignup}>
                회 원 가 입 하 기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;