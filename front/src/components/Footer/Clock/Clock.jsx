import React, { useState, useEffect } from 'react';

function Clock() {
	const blackhole = new Date('May 5, 2020 03:24:00').toLocaleString();
	// const blackhole = new Date("01/05/2020").toLocaleString();
	const [time, setTime] = useState(new Date().toLocaleString());

	useEffect(() => {
		const interval = setInterval(() => {setTime(new Date().toLocaleString())}, 100000)
		return () => {
			clearInterval(interval);
		}
	}, [])

	let date = remaningTime(blackhole, time);

	function remaningTime(blackhole, time) {
		let bh = new Date(blackhole);
		let today = new Date();
		// console.log({today});
		// console.log({blackhole});
		return (Math.round((bhtoday) / (1000 * 60 * 60 * 24)).toFixed(0));
	}
	return (<p>{date} days before blackhole</p>);
}

export default Clock;