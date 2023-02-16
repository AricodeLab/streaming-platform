import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function VideoPlay() {
  const play = {
    fill: true,
    fluid: true,
    autoplay: true,
    controls: true,
    preload: "none",
    sources: [
      {
        src: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
        type: "application/x-mpegURL",
      }
    ],
    liveui: true,
  };
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
    </div>
  );
}

export default VideoPlay;
