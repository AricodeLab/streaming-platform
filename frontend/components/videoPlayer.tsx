import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

function VideoPlay() {
  const videoNode = useRef(null);
  const [player, setPlayer] = useState<Player>(null);

  useEffect(() => {
    const play = {
      fill: true,
      fluid: true,
      autoplay: true,
      controls: true,
      preload: "auto",
      sources: [
        {
          src: " http://xyz.lattv.com.co:8080/playlist/Joao8095/Joao8095/m3u?output=rtmp",
          type: "application/x-mpegURL",
        },
        {
          src: "http://xyz.lattv.com.co:8080/playlist/Joao8095/Joao8095/m3u?output=hls",
          type: "application/x-mpegURL",
        },
        {
          src: "   http://xyz.lattv.com.co:8080/playlist/Joao8095/Joao8095/m3u_plus",
          type: "application/x-mpegURL",
        },
      ],
      liveui: true,
    };

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
  }, [player, setPlayer]);

  return (
    <div data-vjs-player>
      <video ref={videoNode} className="video-js "></video>
    </div>
  );
}

export default VideoPlay;
