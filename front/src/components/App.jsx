import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { SnackbarProvider } from 'notistack';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Header from './Header/Header';
import Foooter from './Footer/Footer';

import Signup from './allPages/Signup/Signup';
import Login from './allPages/Login/Login';
import Homepage from './allPages/Homepage/Homepage';
import Account from './allPages/Account/Account';
import NoMatch from './NoMatch/NoMatch';

const isLog = 1;

function Connexion() {
	return (
		<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Route path="*" component={NoMatch} />
			</Switch>
		</BrowserRouter>
		</SnackbarProvider>
	);
}

function Application() {
	return (
		<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
			<BrowserRouter>
				<Header />				
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route exact path="/account" component={Account} />
					<Route path="*" component={NoMatch} />
				</Switch>
				<Foooter />
			</BrowserRouter>
		</SnackbarProvider>
	);
}

function App() {
	let content;
	if (isLog === 0)
		content = (<Connexion />);
	else 
		content = (<Application />);
	return content;
}

export default App;