import { useEffect, useRef, useState } from "react";
import videojs from "video.js"

function VideoPlay ()  {
  const videoNode = useRef(null);
  const [player, setPlayer] = useState(null);
  const play = {
    fill: true,
    fluid: true,
    autoplay: true,
    controls: true,

    sources: [
      {
        src: "https://v3.szjal.cn/20191101/PZzNpqB1/index.m3u8",
        type: "application/x-mpegURL"
      }
    ]
  };
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