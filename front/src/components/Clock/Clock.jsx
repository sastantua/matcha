import React, { useState, useEffect,  } from 'react';

function Clock() {
	const blackhole = new Date("1 May 2020").toLocaleString();
	const [time, setTime] = useState(new Date().toLocaleString());

	useEffect(() => {
		const interval = setInterval(() => {setTime(new Date().toLocaleString())}, 1000)
		return () => {
			clearInterval(interval);
		}
	}, [])

	let date = remaningTime(blackhole, time);

	function remaningTime(blackhole, time) {
		let bh = new Date(blackhole);
		let today = new Date(time);
		bh = bh.getTime() / 86400000;
		today = today.getTime() / 86400000;
		return (bhtoday).toFixed(0).toLocaleString();
	}

	return (<p>{date} days before blackhole</p>);
}

export default Clock;