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
  preload: "none",
  sources: [
    {
      src: "http://disfruta.net:80/tvlatvgo152728e/XfnGyhSif8/1059",
      type: "application/x-mpegURL",
    },
  ],
  html5: {
    hls: {
      withCredentials: true,
    },
  },
};

function VideoPlay1() {
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
function VideoPlay() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Hls url="http://disfruta.net:80/tvlatvgo152728e/XfnGyhSif8/1059" />
    </Suspense>
  );
}
export default VideoPlay;
