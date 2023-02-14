import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function VideoPlay ()  {

  const play = {
    fill: true,
    fluid: true,
    autoplay: true,
    controls: true,
    preload: "metadata",
    sources: [
      {
        src: "https://v3.szjal.cn/20191101/PZzNpqB1/index.m3u8",
        type: "application/x-mpegURL"
      }
    ]
  };
  const videoNode = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (videoNode.current) {
      const _player = videojs(videoNode.current, play);
      setPlayer(_player);
      return () => {
        if (player !== null) {
          player.dispose();
        }
      };
    }
  }, []);
  return (
    <div data-vjs-player>
      <video ref={videoNode} className="video-js"></video>
    </div>
  );
};


export default VideoPlay;