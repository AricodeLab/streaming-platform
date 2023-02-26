import { Suspense, useEffect, useRef, useState } from "react";
import videojs from "video.js";
import Script from "next/script";
import "video.js/dist/video-js.css";
import Hls from 'react-hls';
import ReactPlayer from "react-player";
const play = {
  fill: true,
  fluid: true,
  autoplay: true,
  controls: true,
  preload: "metadata",
  sources: [
    {
      src: "http://xyz.lattv.com.co:8080/Smartvpremium/Smartvpremium/150839.m3u8",
      type: "application/x-mpegURL"
    }
  ]
};

function VideoPlay1() {
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
}
function VideoPlay() {
  return (
    <ReactPlayer url="http://xyz.lattv.com.co:8080/Smartvpremium/Smartvpremium/150827.m3u8" playing controls />
  );
}
export default VideoPlay;
