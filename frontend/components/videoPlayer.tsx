import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const links = [
  {
    src: "http://xyz.lattv.com.co:8080/playlist/Joao8095/Joao8095/m3u?output=rtmp",
    type: "application/x-mpegURL",
    tipo: "Lista M3u Standard-RTMP",
    tempo_para_carregar: "2m"
  },
  {
    src: "http://xyz.lattv.com.co:8080/playlist/Joao8095/Joao8095/m3u?output=hls",
    type: "application/x-mpegURL",
    tipo: " Lista M3u Standard-HLS "
  }

]

function VideoPlay() {
  const play = {
    fill: true,
    fluid: true,
    autoplay: true,
    controls: true,
    preload: "true",
    sources: [
      {
        src: "http://xyz.lattv.com.co:8080/playlist/Joao8095/Joao8095/m3u_plus",
        type: "application/x-mpegURL",
      }
    ],
    liveui: true,
  };
  const videoNode = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (videoNode.current) {
      const _player = videojs(videoNode.current, play, () =>{
        videojs.log("Video iniciado")
        
        _player.on("start", ()=>{
          const a = new Date()
          videojs.log("video start at " + a.getHours() + ":" +  a.getMinutes())
        })
        _player.on("ready", ()=>{
          const a = new Date()
          videojs.log("video ready at " + a.getHours() + ":" +  a.getMinutes())
        })
        _player.on('play', function() {
          const a = new Date()
          videojs.log("video play at " + a.getHours() + ":" +  a.getMinutes())
        });
      });
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
      <video ref={videoNode} className="video-js"></video>
    </div>
  );
}

export default VideoPlay;
