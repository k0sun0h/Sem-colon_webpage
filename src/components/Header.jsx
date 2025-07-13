import { NavLink, Link } from 'react-router-dom';
import '../css/Header.css';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">SEM;COLON</Link>
      <nav className="nav">
        <NavLink to="/" end>동아리 소개</NavLink><div> | </div>
        <NavLink to="/members">동아리원</NavLink><div> | </div>
        <NavLink to="/projects">스터디 & 프로젝트</NavLink><div> | </div>
        <NavLink to="/recruit">모집</NavLink>
      </nav>
      <Link to="/apply">
        <button className="apply-button">
          동아리 지원하기
        </button>
      </Link>
    </header>
  );
}

export default Header;
