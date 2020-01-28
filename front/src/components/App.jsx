import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { SnackbarProvider } from 'notistack';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Header from './Header/Header';
import Foooter from './Footer/Footer';

// import Signup from './allPages/Signup/Signup';
// import Login from './allPages/Login/Login';
import Homepage from './allPages/Homepage/Homepage';
import Account from './allPages/Account/Account';
import NoMatch from './NoMatch/NoMatch';
import Connexion from './Connexion/Connexion';
import Application from './Application/Application';

const isLog = 1;

function App() {
	let content;

	
	if (isLog === 0)
		content = (<Connexion />);
	else 
		content = (<Application />);
	return content;
}

export default App;