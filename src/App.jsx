import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Write from './pages/Write';
import Apply from './pages/Apply';
import './App.css';

function App() {
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
      <Route path="/apply/:index" element={<Apply dataList={formDataList} />} />
    </Routes>
  );
}

export default App;
