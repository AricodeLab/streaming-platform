import { Suspense, useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

import { playerLog } from "../libs";
import Script from "next/script";
import ReactPlayer from  'react-player'
const play = {
  fill: true,
  fluid: true,
  autoplay: true,
  controls: true,
  preload: "none",
  sources: [
    {
      src : "162.212.152.104:25461/RCNWeb-1/Live/36",
      type: "application/x-mpegURL",
    },
  ],
  liveui: true
  
};

function VideoPlay1() {

  const videoNode = useRef(null);
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    if (videoNode.current) {


      const _player = videojs(videoNode.current, play, () =>{
        console.log("Video iniciado")
        playerLog(_player)
  
      });
      setPlayer(_player);
      return () => {
        if (player !== null) {
          player.dispose();
        }
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div data-vjs-player>
      <video ref={videoNode} className="video-js"></video>
    </div>
    )
}
function VideoPlay() {
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
export default VideoPlay;
