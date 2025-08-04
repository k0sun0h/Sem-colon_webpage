// 페이지 이동 기능을 위한 useNavigate 훅 import
import { useNavigate } from 'react-router-dom';
// 홈 화면에 적용할 전용 CSS import
import '../../../css/Home.css';

function Home({ dataList }) {
  const navigate = useNavigate(); // 페이지 전환 함수 생성

  return (
    <>
      {/* 고정 배경 이미지와 어두운 오버레이 */}
      <div className="fixed-background"></div>

      {/* 콘텐츠를 감싸는 상위 컨테이너 */}
      <div className="content">
        {/* 페이지 상단 제목 */}
        <div className="title">스터디 및 프로젝트 진행 인원 구인</div>

        {/* 중앙 회색 박스 */}
        <div className="content-box">
          {/* 박스 내부 상단 흰색 가로선 */}
          <div className="separator-line"></div>

          {/* 세로 구분선 3개 */}
          <div className="vertical-line vline-1"></div>
          <div className="vertical-line vline-2"></div>
          <div className="vertical-line vline-3"></div>

          {/* 각 열 제목 라벨 */}
          <div className="label-title">제목</div>
          <div className="label-title label-recruit">모집 인원</div>
          <div className="label-title label-date">모집 날짜</div>
          <div className="label-title label-schedule">진행 일정</div>

          {/* 데이터 리스트를 순회하며 각 항목 출력 */}
          {dataList.map((data, idx) => (
            <div key={idx}>
              {/* 제목 출력 */}
              <div className="submitted-data submitted-title" style={{ top: `${100 + idx * 50}px`, cursor: 'pointer' }}
                onClick={() => navigate(`/study/detail/${data.id}`)}>
                  
                {data.title}
              </div>

              {/* 모집 인원 출력 */}
              <div className="submitted-data submitted-recruit" style={{ top: `${100 + idx * 50}px` }}>
                {data.recruitCount}명
              </div>

              {/* 모집 날짜 출력 */}
              <div className="submitted-data submitted-date" style={{ top: `${100 + idx * 50}px` }}>
                {data.recruitStart} ~ {data.recruitEnd}
              </div>

              {/* 진행 일정 출력 + 지원하기 버튼 */}
              <div className="submitted-data submitted-schedule" style={{ top: `${100 + idx * 50}px` }}>
                <span className="schedule-text">
                  {data.scheduleStart} ~ {data.scheduleEnd}
                </span>
              </div>
            </div>
          ))}

          {/* 작성하기 버튼 (새 모집글 작성 페이지로 이동) */}
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
