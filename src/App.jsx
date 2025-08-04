// 전체 레이아웃 (앱 전체를 감싸는 컴포넌트)
// Header, Footer, 페이지별 Route가 설정됨

import {  Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

// 공통 UI 컴포넌트
import Header from './components/Header';
import Footer from './components/Footer';

// 소개 페이지 컴포넌트 (기본 루트 경로 "/")
import Introduce from './pages/Introduce';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// 스터디 & 프로젝트 관련 컴포넌트 (폴더: pages/study)
import StudyHome from './pages/study/StudyHome';

// 동아리원 컴포넌트
import Members from './pages/members/Members';
import AddMember from './pages/members/add/Addmember'; // ⬅️ 이건 반드시 추가해야 함

import WRpost from './pages/my-page/WRpost';

import Applystatus from './pages/my-page/Applystatus';

import EditProfile from './pages/my-page/EditProfile';




function App() {
  // 모집글 데이터를 상태로 관리
  const [formDataList, setFormDataList] = useState(() => {
    // 로컬스토리지에서 기존 데이터를 불러옴 (최초 실행 시 1회만)
    const saved = localStorage.getItem('formDataList');
    return saved ? JSON.parse(saved) : [];
  });

  // formDataList가 변경될 때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('formDataList', JSON.stringify(formDataList));
  }, [formDataList]);

  // 새로운 모집글을 추가하는 함수
  const handleAddFormData = (newData) => {
    setFormDataList((prev) => [...prev, newData]);
  };

// ✅ currentMembers를 localStorage에서 불러오기
  const [currentMembers, setCurrentMembers] = useState(() => {
    const saved = localStorage.getItem('currentMembers');
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ currentMembers가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('currentMembers', JSON.stringify(currentMembers));
  }, [currentMembers]);  

  // 졸업 부원 상태
const [graduatedMembers, setGraduatedMembers] = useState(() => {
  const saved = localStorage.getItem('graduatedMembers');
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem('graduatedMembers', JSON.stringify(graduatedMembers));
}, [graduatedMembers]);






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

            <Route path="/login" element={<Login />} />
              {/* /login 경로로 접근하면 Login 페이지가 렌더링됨 */}

              <Route path="/signup" element={<SignUp />} />
              {/* /signup 경로로 접근하면 SignUp 페이지가 렌더링됨 */}

            <Route path="/study/*" element={<StudyHome />} />

            <Route path="/my-page/WRpost" element={<WRpost />} />

            <Route path="/my-page/Applystatus" element={<Applystatus />} />

            <Route path="/edit-profile" element={<EditProfile />} />

            <Route path="/members" element={<Members 
            currentMembers={currentMembers}
            graduatedMembers={graduatedMembers} />} />

            <Route path="/members/add" element={<AddMember 
            setCurrentMembers={setCurrentMembers}
            setGraduatedMembers={setGraduatedMembers} />} /> 


          </Routes>
        </main>

        {/* 하단 공통 Footer */}
        <Footer />
      </div>

  );
}

export default App;

