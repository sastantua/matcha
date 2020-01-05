import React from 'react';
import logo from './logo.svg';
import './App.css';
import spin from './spin.js'

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo"/>
				<button className="App-btn" onClick={spin}>🤔</button>
			</header>
		</div>
	);
}

export default App;