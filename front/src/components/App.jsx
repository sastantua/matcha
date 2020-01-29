import React, { useState } from 'react';

import Connexion from './Connexion/Connexion';
import Application from './Application/Application';

// const isLog = 1;

function App() {
	let content;
	
	const [userIsLog, setUserIsLog] = useState("no");

	const HandleUserConnexion = async (e) => {
		console.log("here and now");
		console.log(`is user log? ${userIsLog}`);
		await setUserIsLog("yes");
		console.log(`is user log? ${userIsLog}`);
	}


	// const [user, setUser] = useState({
	// 	isLog: 0,
	// 	username: null,
	// 	message: null,
	// 	notification: null
	// });

	// const HandleUserConnexion = (e) => {
	// 	console.log("here and now");
	// 	setUser( ...user, user.isLog = 1);
	// 	console.log(`is user log? ${user.isLog}`);
	// }

	if (userIsLog === "no")
	{
		HandleUserConnexion("hello");
		content = (<Connexion />);
		console.log(`if is user log? ${userIsLog}`);
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