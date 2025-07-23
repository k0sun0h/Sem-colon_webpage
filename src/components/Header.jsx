import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { IoPersonCircle } from "react-icons/io5";
import '../css/Header.css';

function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const popupRef = useRef(null);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  };

  const handleLogin = () => {
    setIsPopupOpen(false);
    navigate('/login');
  };

  const handleSignup = () => {
    setIsPopupOpen(false);
    navigate('/signup');
  };

  // 로그인 상태 변경 감지용
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const storedUser = localStorage.getItem('user');

    if (loginStatus === 'true' && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  // 팝업 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isPopupOpen && popupRef.current && !popupRef.current.contains(e.target)) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPopupOpen]);

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
        <div className="user-popup" ref={popupRef}>
          {!isLoggedIn ? (
            <div className="login-content">
              <p>로그인 필요</p>
              <div className="popup-buttons login-buttons">
                <button onClick={handleLogin}>로그인</button>
                <button onClick={handleSignup}>회원가입</button>
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