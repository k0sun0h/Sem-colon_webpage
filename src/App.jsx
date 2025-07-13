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
      <div>

        {/* Header */}
        <div>
          <Header />
        </div>

        {/* Main */}
        <main>
          <div>

            {/* Routes: 여러 경로를 정의할 수 있는 블록 */}
            {/* Route: 특정 경로에 해당하는 컴포넌트를 렌더링 */}
            <Routes> 
              <Route path="/" element={<Introduce />} /> 
              {/* / 경로로 접근하면 Introduce 페이지가 렌더링됨 */}
            </Routes>

          </div>
        </main>

        {/* Footer */}
        <div>
          <Footer />
        </div>

      </div>
    </Router>
  );
}

export default App;