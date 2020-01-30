import React, { useState } from 'react';

import Connexion from './Connexion/Connexion';
import Application from './Application/Application';

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

function App() {
	let content;
	let dirty = false;
	
	const [userIsLog, setUserIsLog] = useState(false);
	const HandleUserConnexion = (e) => {setUserIsLog(true);}

	if (!dirty && localStorage.token) {
		dirty = true;
		HandleUserConnexion();
	}
	console.log(localStorage.token);

	if (userIsLog === false)	
		content = <Connexion />;
	else if (userIsLog === true)
		content = <Application />;
	return content;
}

export default App;

/*
use ...state because setState overwrite ancient state ()
	const eventHandler = (value) => {
		setState({ ...state, property: value})
	}
*/


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