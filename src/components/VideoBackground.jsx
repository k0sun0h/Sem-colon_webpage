import YouTube from 'react-youtube';
import '../css/VideoBackground.css';
import '../App.css';
import { useRef, useEffect } from 'react';

function VideoBackground() {
  const playerRef = useRef(null); // YouTube 플레이어 객체 저장
  const intervalRef = useRef(null); // setInterval 핸들러 저장

  const onPlayerReady = (event) => {
    const player = event.target;
    playerRef.current = player;

    player.mute();       // 사용자 상호작용 없이 자동 재생 가능
    player.playVideo();  // 영상 즉시 재생

    // 1초 간격으로 현재 시간 체크
    intervalRef.current = setInterval(() => {
      const currentTime = player.getCurrentTime();
      if (currentTime >= 119) {
        player.seekTo(0); // 0초로 되감기
        player.playVideo(); // 다시 재생
      }
    }, 1000);
  };

  useEffect(() => {
    // 컴포넌트 언마운트 시 정리
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="video-background">
      <YouTube
        videoId="XNf1lWwc-Cw"
        onReady={onPlayerReady}
        opts={{
          playerVars: {
            autoplay: 1, // 자동 재생
            controls: 0, // 컨트롤러 숨기기
            showinfo: 0, // 영상 정보 숨기기
            modestbranding: 1, // 브랜드 로고 숨기기
            mute: 1, // 음소거
            start: 0, // 시작 시간
          },
        }}
        className="video-iframe"
      />
      <div className="video-overlay" />
    </div>
  );
}

export default VideoBackground;