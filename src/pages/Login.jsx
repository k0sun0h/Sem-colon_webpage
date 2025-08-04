import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
        alert('이메일과 비밀번호를 모두 입력해주세요.');
        return;
    }


    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
    if (!registeredUser || registeredUser.email !== email) {
      alert('등록된 사용자가 없거나 이메일이 일치하지 않습니다.');
      return;
    }
    if (!password || registeredUser.password !== password) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    const userInfo = {
      name: registeredUser.name,
      major: registeredUser.major,
      email: registeredUser.email,
      profileImage: registeredUser.profileImage || null,
    };



    // 상태 저장
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userInfo));

    alert('로그인 성공!');
    navigate('/');
    window.location.reload();
    };


  return (
    <>
      <div className="login-background" />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">로그인</h2>
          <div className="login-inputs">
            <label>이 메 일</label>
            <input
              type="email"
              value={email}
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-button" onClick={handleLogin}>
            로 그 인 하 기
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;