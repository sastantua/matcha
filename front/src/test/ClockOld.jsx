import React from 'react';
 
class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: new Date().toLocaleString()
		};
	}

	componentDidMount() {
		this.intervalID = setInterval(
			() => this.tick(),
			1000
		);
	}
		
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	tick() {
		this.setState({time: new Date().toLocaleString()});
	}

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