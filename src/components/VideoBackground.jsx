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
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            loop: 1,
            mute: 1,
            playlist: 'XNf1lWwc-Cw',
          },
        }}
        className="video-iframe"
      />
      <div className="video-overlay" />
    </div>
  );
}

export default VideoBackground;
