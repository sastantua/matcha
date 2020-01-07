import React from 'react';
import logo from './logo.svg';
import './reactSpin.css';
import EmojiButton from './EmojiButton';

function App() {
	var duration = 2;

	var changeDuration = () => {
		let logo = document.getElementById("logo");
		duration > 0.15 ? duration -= .25 : duration = 2;
		console.log(duration);
		logo.animate([
			{ transform: 'rotate(0deg)' },
			{ transform: 'rotate(180deg)' }
		],
		{
			duration: duration,
			iterations: Infinity
		})
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" id="logo" alt="logo" />
				<EmojiButton changeDuration={changeDuration} />
			</header>
		</div>
	);
}

export default App;