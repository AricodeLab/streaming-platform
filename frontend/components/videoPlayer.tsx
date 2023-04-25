import React, { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "./Home.module.css";
import axios from "axios";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

type Props = {
  id: number;
  title: string;
  streaming_url: string;
};

interface Channel {
  id: number;
  title: string;
  streaming_url: string;
}

const VideoPlayer: FC<Props> = ({ streaming_url }) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selected, setSelected] = useState<Channel | null>(null);

  useEffect(() => {
    fetchChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchChannels = async () => {
    try {
      const iptv = await axios.get(streaming_url);
      const channelsData = m3uToObj(iptv.data);
      setChannels(channelsData);
    } catch (error) {
      console.log(error);
    }
  };

<<<<<<< HEAD
	const fetchChannels = async () => {
		try {
			const iptv = await axios.get(
				'https://raw.githubusercontent.com/mario1234563119/AEXQOSyIpN2JZ0eh/main/iptvs.m3u',
			);
			const channelsData = m3uToObj(iptv.data);
			setChannels(channelsData);
		} catch (error) {
			console.log(error);
		}
	};
=======
  const m3uToObj = (m3u: string): Channel[] => {
    return m3u
      .replace("#EXTM3U", "")
      .split("#EXTINF:-1 ")
      .slice(1)
      .map(function (str: string, index: number) {
        const line = str.split(",");
        const info = line[1].split("\n");
>>>>>>> 959ec7ba732d784637fef3974a9d3b8a0fffe8a5

        return {
          id: index + 1,
          title: info[0].charAt(0).toUpperCase() + info[0].slice(1),
          streaming_url: info[1],
        };
      });
  };

  const chooseChannel = (e: React.MouseEvent, channel: Channel) => {
    e.preventDefault();
    setSelected(channel);
  };

  const channelsList = channels.map((ch) => (
    <div key={ch.id} onClick={(e) => chooseChannel(e, ch)}>
      {selected?.title == ch.title ? (
        <p className={styles.selected}> {ch.title}</p>
      ) : (
        <p onClick={()=>{
			window.scrollTo({
			top: 0,
			behavior: 'smooth'
		  })}} style={{textAlign:'center'}}>{ch.title}</p>
      )}
    </div>
  ));

  return (
    <main style={{width:'100%',marginBottom:'2rem'}}>
      {selected ? (
        <div  className={styles.main}>
          <div className={styles.video}>
            <h1 className={styles.current}>Estas mirando:{selected.title}</h1>
          </div>
          <div>
            <ReactPlayer
              className="player-wrapper"
              url={selected.streaming_url}
              controls
              playing
              width="100%"
              height="100%"
            />
          </div>
        </div>
      ) : null}
      <div className={styles.title} >
        <h1 >Lista de contenido</h1>
      </div>
      <div className={styles.grid}>{channelsList}</div>
    </main>
  );
};
export default VideoPlayer;
