// src/pages/studypage/Home.jsx
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';   // ✅ 페이지네이션용 hook import
import '../../../css/Home.css';

function Home({ dataList }) {
  const navigate = useNavigate();

  // ✅ 페이지네이션 상태 (변수명 끝에 1)
  const [page1, setPage1] = useState(1);
  const itemsPerPage1 = 8;   // 한 페이지에 보여줄 게시글 수
  const totalPages1 = Math.ceil((dataList?.length || 0) / itemsPerPage1);

  // ✅ 현재 페이지의 아이템만 잘라서 보여주기
  const currentPageItems1 = (dataList || []).slice(
    (page1 - 1) * itemsPerPage1,
    page1 * itemsPerPage1
  );

  // ✅ 페이지 이동 함수
  const changePage1 = (p) => {
    if (p >= 1 && p <= totalPages1) setPage1(p);
  };

  // ✅ 데이터 길이 바뀌면 페이지 유효성 검사
  useEffect(() => {
    if (page1 > totalPages1) setPage1(totalPages1 || 1);
  }, [dataList, totalPages1, page1]);

  return (
    <>
      <div className="fixed-background"></div>
      <div className="content">
        <div className="content-box">
          {/* ✅ Study&Project와 동일한 테이블 구조 */}
          <div className="study-table1">
            <div className="table-header1">
              <span>제목</span>
              <span>참여 인원</span>
              <span>모집 날짜</span>
            </div>

            {/* ✅ 전체가 아닌 현재 페이지 아이템만 렌더 */}
            {currentPageItems1.map((data) => (
              <div
                className="table-row1"
                key={data.id}
                onClick={() => navigate(`/study/detail/${data.id}`)} // 기존 동작 유지
                style={{ cursor: 'pointer' }}
              >
                <span>{data.title}</span>
                <span>{data.recruitCount}명</span>
                <span>{data.recruitStart} ~ {data.recruitEnd}</span>
              </div>
            ))}
          </div>

          {/* ✅ 페이지네이션 UI */}
          <div className="pagination1">
            <span className="page-btn1" onClick={() => changePage1(1)}>처음</span>
            {Array.from({ length: totalPages1 }).map((_, idx) => (
              <span
                key={idx}
                className={`page-btn1 ${page1 === idx + 1 ? 'active' : ''}`}
                onClick={() => changePage1(idx + 1)}
              >
                {idx + 1}
              </span>
            ))}
            <span className="page-btn1" onClick={() => changePage1(page1 + 1)}>&gt;</span>
          </div>

          {/* 작성하기 버튼은 그대로 유지 */}
          <button
            className="write-button"
            onClick={() => {
              const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
              if (!isLoggedIn) {
                alert('로그인 후 이용해주세요.');
                return;
              }
              navigate('/study/write');
            }}
          >
            작성하기
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
