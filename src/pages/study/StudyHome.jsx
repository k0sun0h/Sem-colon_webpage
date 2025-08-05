// React Router의 Routes, Route를 불러와 라우팅 설정에 사용
import { Routes, Route } from 'react-router-dom';
// React의 useState, useEffect 훅을 사용하기 위해 import
import { useState, useEffect } from 'react';

// 하위 페이지 컴포넌트들 import
// Home: 메인 페이지
// Write: 작성 페이지
// Appl: 지원서 작성 페이지
import Home from './studypage/Home';
import Write from './studypage/Write';
import Appl from './studypage/Appl';
import Detail from './studypage/Detail'
// StudyHome 전용 CSS import
import '../../css/StudyHome.css';

function StudyHome() {
  // formDataList 상태 선언 (로컬스토리지에 저장된 값이 있으면 불러오고, 없으면 빈 배열)
  const [formDataList, setFormDataList] = useState(() => {
    const saved = localStorage.getItem('postList');
    return saved ? JSON.parse(saved) : [];
  });

  // formDataList가 변경될 때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('formDataList', JSON.stringify(formDataList));
  }, [formDataList]);

  // 새로운 데이터를 기존 리스트에 추가하는 함수
  const handleAddFormData = (newData) => {
    setFormDataList((prev) => [...prev, newData]);
  };

  // 라우팅 설정: / → Home, /write → Write, /appl/:index → Appl
  return (
    <Routes>
      <Route path="/" element={<Home dataList={formDataList} />} />
      <Route path="/write" element={<Write addFormData={handleAddFormData} />} />
      <Route path="/appl/:id" element={<Appl dataList={formDataList} />} />
      <Route path="/detail/:id" element={<Detail dataList={formDataList} />} />
    </Routes>
  );
}

// 컴포넌트 외부에서 사용할 수 있도록 export
export default StudyHome;
