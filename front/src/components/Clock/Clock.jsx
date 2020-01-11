import React from 'react';

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: new Date().toLocaleString()
		};
	}

	render() {
		let date = this.state.time;
		date = date.split(',');
		console.log(date);
		return (
			<p className="App-clock">
				{date[1]} {date[0]}.
			</p>
		);
	}
} 

export default Clock;