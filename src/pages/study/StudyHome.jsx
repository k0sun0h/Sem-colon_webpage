import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
// src/pages/study/StudyHome.jsx
import Home from './studypage/Home';
import Write from './studypage/Write';
import Appl from './studypage/Appl';
import './StudyHome.css';

function StudyHome() {
  const [formDataList, setFormDataList] = useState(() => {
    const saved = localStorage.getItem('formDataList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('formDataList', JSON.stringify(formDataList));
  }, [formDataList]);

  const handleAddFormData = (newData) => {
    setFormDataList((prev) => [...prev, newData]);
  };

  return (
    <Routes>
      <Route path="/" element={<Home dataList={formDataList} />} />
      <Route path="/write" element={<Write addFormData={handleAddFormData} />} />
      <Route path="/appl/:index" element={<Appl dataList={formDataList} />} />    </Routes>
  );
}


export default StudyHome;
