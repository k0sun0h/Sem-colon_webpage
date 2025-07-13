// 전체 레이아웃 (앱 전체를 감싸는 컴포넌트)
// Header, Footer, 페이지별 Route가 설정됨
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 이 컴포넌트들이 모든 페이지에 공통으로 들어감 (전역 레이아웃)
import Header from './components/Header';
import Footer from './components/Footer';

// /pages/Introduce.js 파일에서 Introduce 페이지 컴포넌트를 가져옴
import Introduce from './pages/Introduce';

function App() {
  return (
    <Router>
      {/* div 태그로 전체 앱의 배경과 최소 높이 설정 */}
      <div className="w-full min-h-screen"> {/* w-full: 너비 100% |  min-h-screen: 화면 전체 높이를 최소 높이로 지정 */}
        <Header />

        <main className="flex justify-center"> {/* 내부 콘텐츠를 수평 정렬 | 가로 방향 중앙 정렬 */}
          <div className="w-full max-w-[1440px] px-6 py-12"> {/* w-full: 너비 100% | max-w-[1440px]: 최대 너비를 1440px로 제한 | px-6 py-12: 좌우 24px, 상하 48px의 패딩 설정 */}

            {/* Routes: 여러 경로를 정의할 수 있는 블록 */}
            {/* Route: 특정 경로에 해당하는 컴포넌트를 렌더링 */}
            <Routes> 
              <Route path="/" element={<Introduce />} /> 
              {/* / 경로로 접근하면 Introduce 페이지가 렌더링됨 */}
            </Routes>

          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;