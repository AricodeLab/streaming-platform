import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import Script from 'next/script'
import "video.js/dist/video-js.css";
const play = {
  fill: true,
  fluid: true,
  autoplay: true,
  controls: true,
  preload: "none",
  sources: [
    {
      src: "../public/playlist_Joao8095_plus.m3u",
      type: "application/x-mpegURL",
    },
  ],
  html5: {
    hls: {
      withCredentials: true
    }
  }
};
function VideoPlay() {
  
  const videoNode = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (videoNode.current) {
      const _player = videojs(videoNode.current, play, () =>
        console.log("Video iniciado")
      );
      setPlayer(_player);
      return () => {
        if (player !== null) {
          player.dispose();
        }
      };
    }
  }, [setPlayer]);
  return (
    <div data-vjs-player>
      <video ref={videoNode} className="video-js "></video>
      <Script src="videojs-contrib-hls.min.js"onLoad={() => {
          console.log('Script has loaded')
        }} async/>
    </div>
    
  );
}

export default VideoPlay;
