import React, { useState } from 'react';

import Connexion from './Connexion/Connexion';
import Application from './Application/Application';

const isLog = 1;

function App() {
	let content;
	
	const [user, setUser] = useState({
		isLog: false,
		username: null,
		message: null,
		notification: null
	});

	const HandleLogEvent = (e) => {
		setState( ...user, isLog: true);
	}

	if (user.isLog === false)
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