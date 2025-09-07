import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { useAuth } from "../contexts/useAuth.jsx";
import "../css/Header.css";

function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user, logout } = useAuth();  // AuthContext 사용
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleLogout = () => {
    logout();
    setIsPopupOpen(false);
  };

  const handleLogin = () => {
    setIsPopupOpen(false);
    navigate("/login");
  };

  const handleSignup = () => {
    setIsPopupOpen(false);
    navigate("/signup");
  };

  // 팝업 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isPopupOpen && popupRef.current && !popupRef.current.contains(e.target)) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPopupOpen]);

  return (
    <header className="header">
      <Link to="/" className="logo">SEM;COLON</Link>
      <nav className="nav">
        <NavLink to="/" end>동아리 소개</NavLink><div> | </div>
        <NavLink to="/members">동아리원</NavLink><div> | </div>
        <NavLink to="/study&project">스터디 & 프로젝트</NavLink><div> | </div>
        <NavLink to="/study">모집</NavLink>
      </nav>
      <div className="header-buttons">
        <Link to="/apply">
          <button className="apply-button">동아리 지원하기</button>
        </Link>
        <IoPersonCircle className="my-page-icon" onClick={togglePopup} />
      </div>

      {isPopupOpen && (
        <div className="user-popup" ref={popupRef}>
          {!user ? (
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
                {/* 프로필 이미지 (현재 API에 이미지 없음 → 기본 빈 div) */}
                <div className="profile-img" />
                <div>
                  <h2>{user.name || user.userId}</h2>
                  <p className="email">{user.email}</p>
                </div>
              </div>
              <div className="profile-content">
                <div className="apply-status">
                  <Link to="/my-page/WRpost"><p>모집글 작성 현황</p></Link>
                  <Link to="/my-page/applystatus"><p>내 지원 현황</p></Link>
                </div>
                <div className="popup-buttons profile-buttons">
                  <button onClick={() => navigate("/edit-profile")}>정보 수정</button>
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
