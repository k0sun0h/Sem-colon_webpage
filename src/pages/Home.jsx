import { useNavigate } from 'react-router-dom';
import './Home.css';


function Home({ dataList }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed-background"></div>
      <div className="content">
        <div className="title">스터디 및 프로젝트 진행 인원 구인</div>
        <div className="content-box">
          <div className="separator-line"></div>
          <div className="vertical-line vline-1"></div>
          <div className="vertical-line vline-2"></div>
          <div className="vertical-line vline-3"></div>
          <div className="label-title">제목</div>
          <div className="label-title label-recruit">모집 인원</div>
          <div className="label-title label-date">모집 날짜</div>
          <div className="label-title label-schedule">진행 일정</div>

          {dataList.map((data, idx) => (
            <div key={idx}>
              <div className="submitted-data submitted-title" style={{ top: `${100 + idx * 50}px` }}>
                {data.title}
              </div>
              <div className="submitted-data submitted-recruit" style={{ top: `${100 + idx * 50}px` }}>
                {data.recruitCount}명
              </div>
              <div className="submitted-data submitted-date" style={{ top: `${100 + idx * 50}px` }}>
                {data.recruitStart} ~ {data.recruitEnd}
              </div>
              <div className="submitted-data submitted-schedule" style={{ top: `${100 + idx * 50}px` }}>
                <span className="schedule-text">{data.scheduleStart} ~ {data.scheduleEnd}</span>
                <button className="apply-button" onClick={() => navigate(`/apply/${idx}`)}>지원하기</button>
              </div>
            </div>
          ))}

          <button className="write-button" onClick={() => navigate('/write')}>
            작성하기
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
