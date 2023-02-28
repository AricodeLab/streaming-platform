import { useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-hls';

function StreamPlayer() {
  const [streamUrl, setStreamUrl] = useState('');

  useEffect(() => {
    async function fetchStream() {
      const response = await fetch('http://xyz.lattv.com.co:8080/playlist/Joao8095/Joao8095/m3u_plus?output=hls');
      const m3u = await response.text();
      const lines = m3u.split('\n');
      const reducedStream = lines
        .filter((line) => !line.startsWith('#'))
        .join('\n');
      setStreamUrl(reducedStream);
    }

    fetchStream();
  }, []);

  useEffect(() => {
    const player = videojs('http://xyz.lattv.com.co:8080/playlist/Joao8095/Joao8095/m3u_plus?output=hls', {
      html5: {
        hls: {
          enableLowInitialPlaylist: true,
          smoothQualityChange: true,
          overrideNative: true,
        },
      },
    });

    player.src({ src: streamUrl, type: 'application/x-mpegURL' });
    player.play();

    return () => {
      player.dispose();
    };
  }, [streamUrl]);

  return (
    <div data-vjs-player>
      <video
        id="stream-player"
        className="video-js"
        controls
        autoPlay
        playsInline
      ></video>
    </div>
  )
}
export default StreamPlayer