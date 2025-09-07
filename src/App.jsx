// 전체 레이아웃 (앱 전체를 감싸는 컴포넌트)
// Header, Footer, 페이지별 Route가 설정됨

import { Routes, Route } from "react-router-dom";

// 공통 UI 컴포넌트
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/ProtectedRoute.jsx";

// 소개/인증 페이지
import Introduce from "./pages/Introduce";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// 스터디 & 프로젝트
import StudyAndProject from "./pages/Study&Project.jsx";
import StudyDetail from "./pages/StudyDetail.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import StudyHome from "./pages/study/StudyHome";

// 동아리원
import Members from "./pages/members/Members";
import AddMember from "./pages/members/add/Addmember";

// 마이페이지
import WRpost from "./pages/my-page/WRpost";
import Applystatus from "./pages/my-page/Applystatus";
import EditProfile from "./pages/my-page/EditProfile";
import Applicants from "./pages/my-page/Applicants";
import ViewAppl from "./pages/my-page/ViewAppl";

function App() {
  return (
    <div>
      {/* 상단 공통 Header */}
      <Header />

      {/* 메인 콘텐츠 (라우팅으로 화면 분기) */}
      <main>
        <Routes>
          {/* 루트 경로 "/" 접근 시 소개 페이지 렌더링 */}
          <Route path="/" element={<Introduce />} />

          {/* 인증 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* 스터디 & 프로젝트 메인/상세 */}
          <Route path="/study&project" element={<StudyAndProject />} />
          <Route path="/studydetail" element={<StudyDetail />} />
          <Route path="/projectdetail" element={<ProjectDetail />} />

          {/* 로그인 필요 페이지들만 PrivateRoute로 감쌈 */}
          <Route
            path="/study/*"
            element={
              <PrivateRoute>
                <StudyHome />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-page/WRpost"
            element={
              <PrivateRoute>
                <WRpost />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-page/Applystatus"
            element={
              <PrivateRoute>
                <Applystatus />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/applicants/:postId"
            element={
              <PrivateRoute>
                <Applicants />
              </PrivateRoute>
            }
          />

          <Route
            path="/view-appl/:postId/:email"
            element={
              <PrivateRoute>
                <ViewAppl />
              </PrivateRoute>
            }
          />

          {/* 동아리원: 목록은 공개, 등록은 보호 */}
          <Route path="/members" element={<Members />} />
          <Route
            path="/members/add"
            element={
              <PrivateRoute>
                <AddMember />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      {/* 하단 공통 Footer */}
      <Footer />
    </div>
  );
}

export default App;
