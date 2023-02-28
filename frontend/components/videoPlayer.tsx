import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-hls"
import Script from "next/script";
import { playerLog } from "../libs";
const play = {
  fill: true,
  fluid: true,
  autoplay: true,
  controls: true,
  preload: "none",
  sources: [
    {
      src: "http://xyz.lattv.com.co:8080/Smartvpremium/Smartvpremium/150805",
      type: "application/x-mpegURL",
    },
  ],
  html5: {
    hls: {
      enableLowInitialPlaylist: true,
      smoothQualityChange: true,
      overrideNative: true,
      useNetworkInformationApi: true,
      experimentalBufferBasedABR: true
    }
  },
  liveui: true
  
};
function VideoPlay() {
  

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
  }, [setPlayer]);
  return (
    <div data-vjs-player>
      <video ref={videoNode} className="video-js"></video>
      <link
        href="https://vjs.zencdn.net/7.15.4/video-js.min.css"
        rel="stylesheet"
        integrity="sha384-qtMeiqNYAEkWJHm4yfDJi9XsCO4YFjRUcGtRZP/IS/AMKpZlLqG3qll60dD9okzt"
        crossOrigin="anonymous"
      />
      <Script
        src={`https://cdn.jsdelivr.net/npm/hls.js@latest`}
        integrity="sha384-nfDWkwLZm+MQCYH9V7xmx/aKvJgigB49+oSiio5bKavhAWZgPO7IaMvgO9N+ulqO"
        crossOrigin="anonymous"
        
      />
      <Script
        src={`https://cdn.jsdelivr.net/npm/videojs-contrib-hls@latest/dist/videojs-contrib-hls.min.js`}
        integrity="sha384-hVhJZGzv7R+L02c9B7VWTxgj2NyPAyfl84tuwz5It5RYn8pGVQuhZKjSy/UdX0NR"
        crossOrigin="anonymous"
      />

    </div>
    
  );
}

export default VideoPlay;
