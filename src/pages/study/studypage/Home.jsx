// src/pages/studypage/Home.jsx
import { useNavigate } from 'react-router-dom';
import '../../../css/Home.css';

function Home({ dataList }) {
  const navigate = useNavigate();

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

            {dataList.map((data) => (
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
