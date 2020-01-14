import React from 'react';

function tick() {
	setTime({time: new Date().toLocaleString()});
}

function Clock () {
	const [time, setTime] = useState(new Date().toLocaleString());
	const [interval, setInterval] = useEffect(setInterval(tick(), 1000));
		
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		time: new Date().toLocaleString()
	// 	};
	// }

	// componentDidMount() {
	// 	this.intervalID = setInterval(
	// 		() => this.tick(),
	// 		1000
	// 	);
	// }
		
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	// tick() {
	// 	this.setState({time: new Date().toLocaleString()});
	// }

	render() {
		let date = this.state.time;
		date = date.split(',');
		return (
			<p className="App-clock">
				blackhole in : {date[1]} {date[0]}
			</p>
		);
	}
} 

export default Clock;


/* 
https://www.scriptol.fr/javascript/dates-difference.php

var bh = new Date("30 April 2020");
var today = new Date();

function remaningTime(bh, today)
{
  bh = bh.getTime() / 86400000;
  today = today.getTime() / 86400000;
  return new Number(todaybh).toFixed(0);
}

*/ 
