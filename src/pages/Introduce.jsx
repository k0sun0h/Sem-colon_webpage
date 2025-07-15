import '../css/Introduce.css';
import VideoBackground from '../components/VideoBackground';

function Introduce() {
  return (
    <>
      <div className="mainPage">
        <VideoBackground />

        <img src="Sem;colon_logo_white.png" alt="메인 로고" className="main-logo" />
        <div className="mainText">
          <div className="mainTitle">SEM;COLON</div>
          <div className="mainSubtitle">
            다양한 IT 분야의 사람들이 모여 높은 곳까지 <br />
            함께 성장해나가는 지능형SW융합대학의 코딩 동아리
          </div>
        </div>
      </div>

      <section className="nextSection">
        <div className="growth-circle">
          <img src="/logo1.png" className="circle-item item1" />
          <img src="/logo2.png" className="circle-item item2" />
          <img src="/logo3.png" className="circle-item item3" />
          <img src="/logo4.png" className="circle-item item4" />
          <img src="/logo5.png" className="circle-item item5" />

          <div className="circle-center-text">‘함께하는 성장’</div>
          <div className="circle-path"></div>
        </div>
      </section>

      <section className="clubInfoSection">
        <div className="club-info-row">
          <div className="club-info-title-1">동아리 설립일</div>
          <div className="club-info-1">2023.06.01.</div>
        </div>

        <div className="club-info-row">
          <div className="club-info-2">
            수원대학교 지능형SW융합대학 내에 <br />
            프로그래밍 기초부터 전공 수업, <br />
            프로젝트까지 함께 공부하고 성장해 <br />
            나갈 수 있는 모임이 부족했습니다. <br />
            이에 따라, 비전공자가 하는 학생들도 <br />
            부담 없이 시작할 수 있도록 학습의 <br />
            길잡이 역할을 하는 동아리를 <br />
            직접 만들고자 하였습니다.
          </div>
          <div className="club-info-title-2">설립 이유</div>
        </div>

        <div className="club-info-row">
          <div className="club-info-title-1 goal">목표</div>
          <div className="club-info-1">
            서로 지식을 나누고 협업하는 문화를 <br />
            조성함으로써, 함께 성장하고 도전하는 <br />
            학습 환경을 만들어가고자 합니다.
          </div>
        </div>
      </section>

      <section className="clubScheduleSection">
        <div className="club-info-bottom">
          <div className='club-info-bottom-title'>
            <p><strong>학기 중</strong></p>
            <div className="club-activity-box">
              <p>스터디</p>
              <p>멘토링</p>
              <p>개강/종강 파티</p>
              <p>신입생 모집<span>학기 시작 시 모집</span></p>
            </div>
          </div>
          <div className='club-info-bottom-title'>
            <p><strong>방학 중</strong></p>
            <div className="club-activity-box">
              <p>스터디</p>
              <p>프로젝트</p>
              <p>MT</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Introduce;