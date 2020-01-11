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
		console.log(date);
		return (
			<p className="App-clock">
				{date[1]}<br/>{date[0]}
			</p>
			// <p className="App-clock">
				// {this.state.time}
			// </p>
		);
	}
} 

export default Clock;