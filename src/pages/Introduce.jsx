import "../css/Introduce.css";
import VideoBackground from "../components/VideoBackground";
import { useEffect } from "react";

function Introduce() {
  useEffect(() => {
    const items = document.querySelectorAll(".circle-item");
    const svg = document.querySelector(".circle-path-svg");
    const container = document.querySelector(".growth-circle");

    if (!svg || !items.length || !container) return;

    const svgRect = svg.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const svgCenterX = svgRect.width / 2;
    const svgCenterY = svgRect.height / 2;
    const offsetX = svgRect.left - containerRect.left;
    const offsetY = svgRect.top - containerRect.top;

    const cx = offsetX + svgCenterX;
    const cy = offsetY + svgCenterY;

    const svgScaleX = svgRect.width / 1200;
    const svgScaleY = svgRect.height / 600;

    const rx = 480 * svgScaleX;
    const ry = 180 * svgScaleY;

    const count = items.length;
    const angleList = [...Array(count)].map(
      (_, i) => i * ((2 * Math.PI) / count)
    );
    const targetAngleList = [...angleList];
    const followSpeed = 0.01;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // 대상 섹션들을 찾아 등록
    const sections = document.querySelectorAll(".fade-up-section");
    sections.forEach((section) => observer.observe(section));

    function getNewAngle(existingAngles, minGap = 0.8) {
      const maxTry = 100;
      for (let attempt = 0; attempt < maxTry; attempt++) {
        const newAngle = Math.random() * 2 * Math.PI;
        const isFarEnough = existingAngles.every((a) => {
          const diff = Math.abs(
            ((a - newAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
          );
          return diff >= minGap;
        });
        if (isFarEnough) return newAngle;
      }
      return Math.random() * 2 * Math.PI; // fallback
    }

    function updateAngles() {
      for (let i = 0; i < count; i++) {
        const delta =
          ((targetAngleList[i] - angleList[i] + Math.PI * 3) % (Math.PI * 2)) -
          Math.PI;
        angleList[i] += delta * followSpeed;
      }
    }

    function render() {
      updateAngles();

      const rotation = -10 * (Math.PI / 180); // -10deg 회전 (라디안)

      items.forEach((item, i) => {
        const theta = angleList[i];
        const x = cx + rx * Math.cos(theta);
        const y = cy + ry * Math.sin(theta);

        // 회전 변환 적용
        const rotatedX =
          cx + (x - cx) * Math.cos(rotation) - (y - cy) * Math.sin(rotation);
        const rotatedY =
          cy + (x - cx) * Math.sin(rotation) + (y - cy) * Math.cos(rotation);

        item.style.transform = `translate(${rotatedX - 100}px, ${
          rotatedY - 100
        }px)`; // 중심 보정
      });

      requestAnimationFrame(render);
    }

    render();

    const interval = setInterval(() => {
      const newAngles = [];
      for (let i = 0; i < count; i++) {
        const angle = getNewAngle(newAngles, (2 * Math.PI) / (count * 1.2)); // 최소 거리 보장
        newAngles.push(angle);
      }
      for (let i = 0; i < count; i++) {
        targetAngleList[i] = newAngles[i];
      }
    }, 3000);

    return () => {
      clearInterval(interval); // 기존 원형 회전용 interval 정리
      observer.disconnect(); // 옵저버도 정리
    };
  }, []);

  return (
    <>
      <div className="mainPage">
        <VideoBackground />
        <img
          src="Sem;colon_logo_white.png"
          alt="메인 로고"
          className="main-logo"
        />
        <div className="mainText">
          <div className="mainTitle">SEM;COLON</div>
          <div className="mainSubtitle">
            다양한 IT 분야의 사람들이 모여 높은 곳까지 <br />
            함께 성장해나가는 지능형SW융합대학의 코딩 동아리
          </div>
        </div>
      </div>

      <section className="nextSection fade-up-section">
        <div className="growth-circle">
          {/* 타원 경로 SVG */}
          <svg
            width="1400"
            height="800"
            viewBox="0 0 1200 600"
            className="circle-path-svg"
          >
            <ellipse
              cx="600"
              cy="300"
              rx="550"
              ry="250"
              stroke="white"
              fill="none"
              strokeWidth="2"
            />
          </svg>

          {/* 중앙 텍스트 */}
          <div className="circle-center-text">‘함께하는 성장’</div>

          {/* 이미지 아이템 */}
          <img src="/logo1.png" className="circle-item" />
          <img src="/logo2.png" className="circle-item" />
          <img src="/logo3.png" className="circle-item" />
          <img src="/logo4.png" className="circle-item" />
          <img src="/logo5.png" className="circle-item" />
        </div>
      </section>

      <section className="clubInfoSectionTotal">
        <section className="clubInfoSection fade-up-section">
          <div className="club-info-row">
            <div className="club-info-title-1">동아리 설립일</div>
            <div className="club-info-1">2023.06.01.</div>
          </div>
        </section>

        <section className="clubInfoSection fade-up-section">
          <div className="club-info-row">
            <div className="club-info-2">
              <p>
                누구나 부담 없이 시작할 수 있는 <strong>동아리</strong>가
                필요했습니다.
              </p>
              <br />
              <p>
                그래서 함께 성장할 수 있는 <strong>길잡이</strong>가 되어줄
              </p>
              <p>모임을 직접 만들기로 했습니다.</p>
            </div>
            <div className="club-info-title-2">설립 이유</div>
          </div>
        </section>

        <section className="clubInfoSection fade-up-section">
          <div className="club-info-row">
            <div className="club-info-title-3 goal">목표</div>
            <div className="club-info-3">
              <p>지식을 나누고, 함께 도전하며, 함께 성장하는 것.</p>
              <p>
                <strong>SEM;COLON</strong>은 그런 환경을 만들어갑니다.
              </p>
            </div>
          </div>
        </section>
      </section>

      <section className="clubScheduleSection fade-up-section">
        <div className="club-info-bottom-tags">
          <p className="schedule-title">학기 중</p>
          <div className="tag-list">
            <span className="tag">스터디</span>
            <span className="tag">멘토링</span>
            <span className="tag">개강/종강 파티</span>
            <span className="tag">
              신입생 모집 <span className="tag-subtext">학기 시작 시 모집</span>
            </span>
          </div>

          <p className="schedule-title">방학 중</p>
          <div className="tag-list">
            <span className="tag">스터디</span>
            <span className="tag">프로젝트</span>
            <span className="tag">MT</span>
          </div>
        </div>
      </section>
    </>
  );
}


export default Introduce;

