import React, { useState } from 'react';

import Connexion from './Connexion/Connexion';
import Application from './Application/Application';

const isLog = 1;

function App() {
	let content;
	
	const [user, setUser] = useState({
		isLog: 0,
		username: null,
		message: null,
		notification: null
	});

	const HandleLogEvent = (e) => {
		console.log("here and now");
		setUser( ...user, isLog = 1);
	}

	if (user.isLog === 0)
	{
		HandleLogEvent("hello");
		content = (<Connexion />);
	}
	else 
		content = (<Application />);
	return content;
}

export default App;

/*
 use ...state because setState overwrite ancient state ()
	const eventHandler = (value) => {
		setState({ ...state, property: value})
	}
*/