import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import styles from './Home.module.css';
import axios from 'axios';



const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

type Props = {
	id: number;
	title: string;
	streaming_url: string;
};

const excludedChannels = [
	'Euronew',
  'DWA',
];

interface Channel {
	id: number;
	title: string;
	streaming_url: string;
}

const VideoPlayer: FC<Props> = () => {

	const [channels, setChannels] = useState<Channel[]>([]);
	const [selected, setSelected] = useState<Channel | null>(null);

	useEffect(() => {
		fetchChannels();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchChannels = async () => {
		try {
			const iptv = await axios.get(
				'https://raw.githubusercontent.com/mario1234563119/tvfs/main/plalistfuls.txt',
			);
			const channelsData = m3uToObj(iptv.data);
			setChannels(channelsData);
		} catch (error) {
			console.log(error);
		}
	};

	const m3uToObj = (m3u: string): Channel[] => {
		return m3u
			.replace('#EXTM3U', '')
			.split('#EXTINF:-1 ')
			.slice(1)
			.map(function (str, index) {
				const line = str.split(',');
				const info = line[1].split('\n');

				return {
					id: index + 1,
					title: info[0],
					streaming_url: info[1],
				};
			})
			.filter((ch) => !excludedChannels.includes(ch.title));
	};

	const chooseChannel = (e: React.MouseEvent, channel: Channel) => {
		e.preventDefault();
		setSelected(channel);
	};

	const channelsList = channels.map((ch) => (
		<div key={ch.id} onClick={(e) => chooseChannel(e, ch)}>
			{ch.title}
		</div>
	));

	return (
		<main className={styles.main}>
			<Head>
				<title>TV WS</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<h1 className={styles.title}>TV SPAÑA</h1>

			<div className={styles.grid}>{channelsList}</div>

			{selected ? (
				<>
					<h1>{selected.title}</h1>
					<p>estas mirando: {selected.title}</p>
					<ReactPlayer
						className="player-wrapper"
						url={selected.streaming_url}
						controls
						playing
						width="100%"
						height="100%"
					/>
				</>
			) : null}
		</main>
	);
};
export default VideoPlayer