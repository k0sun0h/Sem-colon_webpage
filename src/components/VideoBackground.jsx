import YouTube from 'react-youtube';
import '../css/VideoBackground.css';
import '../App.css';

function VideoBackground() {
  return (
    <div className="video-background">
      <YouTube
        videoId="XNf1lWwc-Cw"
        opts={{
          playerVars: {
            autoplay: 1, // 자동 재생
            controls: 0, // 컨트롤러 숨기기
            showinfo: 0, // 영상 정보 숨기기
            modestbranding: 1, // 브랜드 로고 숨기기
            loop: 1, // 반복 재생
            mute: 1, // 음소거
            playlist: 'XNf1lWwc-Cw', // 반복 재생을 위한 플레이리스트 설정
            start: 0, // 시작 시간
            end: 119, // 종료 시간 (119초)
          },
        }}
        className="video-iframe"
      />
      <div className="video-overlay" />
    </div>
  );
}

export default VideoBackground;