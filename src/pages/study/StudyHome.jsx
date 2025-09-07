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
  // 서버에서 불러온 모집 글 목록 상태
  const [formDataList, setFormDataList] = useState([]);
  // 로딩 상태
  const [loading, setLoading] = useState(true);
  // 에러 메시지 상태
  const [error, setError] = useState('');

  // [추가] 서버 응답 → 화면 모델로 정규화
  const normalize = (it) => {
    const toRange = (v) => {
      if (!v) return { start: '', end: '' };
      if (typeof v === 'string' && v.includes('~')) {
        const [s, e] = v.split('~').map((x) => x.trim());
        return { start: s, end: e || s };
      }
      if (typeof v === 'object' && (v.start || v.end)) {
        return { start: v.start || '', end: v.end || v.start || '' };
      }
      return { start: String(v), end: String(v) };
    };
    const r = toRange(it.recruitDate);
    const p = toRange(it.progressDate);
    return {
      id: it.id ?? it._id ?? crypto.randomUUID(),
      title: it.title ?? '',
      recruitCount: it.personnel ?? '',
      recruitStart: r.start,
      recruitEnd: r.end,
      scheduleStart: p.start,
      scheduleEnd: p.end,
      etc: it.content ?? '',
    };
  };

  // 마운트 시 서버에서 목록 불러오기
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // [추가] 목록 조회 API 호출
        const res = await fetch('/api/study', { method: 'GET' });
        if (!res.ok) throw new Error(`GET /api/study ${res.status}`);
        const data = await res.json().catch(() => []);
        if (!alive) return;
        const list = Array.isArray(data) ? data : [];
        setFormDataList(list.map(normalize));
      } catch (e) {
        setError(e.message || '목록을 불러오지 못했습니다.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (loading) return <div style={{ color: '#fff', padding: 24 }}>불러오는 중…</div>;
  if (error)   return <div style={{ color: '#fff', padding: 24 }}>{error}</div>;

  // 라우팅 설정
  return (
    <Routes>
      {/* 홈(목록) 페이지 */}
      <Route path="/" element={<Home dataList={formDataList} />} />
      {/* 작성 페이지 */}
      <Route path="/write" element={<Write />} />
      {/* 지원서 작성 페이지 */}
      <Route path="/appl/:id" element={<Appl dataList={formDataList} />} />
      {/* 상세 페이지 */}
      <Route path="/detail/:id" element={<Detail dataList={formDataList} />} />
    </Routes>
  );
}

// 컴포넌트 외부에서 사용할 수 있도록 export
export default StudyHome;
