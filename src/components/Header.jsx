import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IoPersonCircle } from "react-icons/io5";
import '../css/Header.css';

function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태 (초기값 테스트용)

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const handleLogout = () => setIsLoggedIn(false);
  const handleLogin = () => setIsLoggedIn(true);

  // 테스트용 유저 데이터
  const user = {
    name: "홍길동",
    major: "전기공학과",
    email: "hi1234@suwon.ac.kr",
  };
  
  return (
    <header className="header">
      <Link to="/" className="logo">SEM;COLON</Link>
      <nav className="nav">
        <NavLink to="/" end>동아리 소개</NavLink><div> | </div>
        <NavLink to="/members">동아리원</NavLink><div> | </div>
        <NavLink to="/projects">스터디 & 프로젝트</NavLink><div> | </div>
        <NavLink to="/recruit">모집</NavLink>
      </nav>
      <div className='header-buttons'>
        <Link to="/apply">
          <button className="apply-button">동아리 지원하기</button>
        </Link>
        <IoPersonCircle className="my-page-icon" onClick={togglePopup} />
      </div>

      {isPopupOpen && (
        <div className="user-popup">
          {!isLoggedIn ? (
            <div className="login-content">
              <p>로그인 필요</p>
              <div className="popup-buttons login-buttons">
                <button onClick={handleLogin}>로그인</button>
                <button>회원가입</button>
              </div>
            </div>
          ) : (
            <>
              <div className="profile-content">
                <div className="profile-img" />
                <div>
                  <h2>{user.name}</h2>
                  <p>{user.major}</p>
                  <p className="email">{user.email}</p>
                </div>
              </div>
              <div className="profile-content">
                <div className="apply-status">
                  <Link to="/my-page/apply-status"><p>모집글 작성 현황</p></Link>
                  <Link to="/my-page/apply-status"><p>내 지원 현황</p></Link>
                </div>
                <div className="popup-buttons profile-buttons">
                  <button>정보 수정</button>
                  <button onClick={handleLogout}>로그아웃</button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
