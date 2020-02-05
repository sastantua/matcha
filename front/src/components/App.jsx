import React, { useState, useContext } from 'react';

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { SnackbarProvider } from 'notistack';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Homepage from '../containers/Homepage/Homepage';
import Account from '../containers/Account/Account';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import Signup from '../containers/Signup/Signup';
import Login from '../containers/Login/Login';
import Logout from '../containers/Logout/Logout';
import NoMatch from '../containers/NoMatch/NoMatch';

import UserContext from '../context/UserContext'

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const AuthenticatedRoute = ({ component: Component, ...rest}) => {
	return (
	<Route 
		{...rest}
		render = { props => {
			return localStorage.getItem("token") ?
			<Component {...props} /> : <Redirect to={{pathname: '/login', state: {from: props.location }}} />
		}}
	/>
	)
}

function App() {
	const { userData, setUserData } = useContext(UserContext);

	return (
		<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
			<UserContext.Provider value={{ userData, setUserData }}>
				<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
					<AuthenticatedRoute exact path="/" component={Homepage} />
					<AuthenticatedRoute exact path="/logout" component={Logout} />
					<AuthenticatedRoute exact path="/account" component={Account} />
					<Route path="*" component={NoMatch} />
				</Switch>
				<Footer />
				</BrowserRouter>
			</UserContext.Provider>
		</SnackbarProvider>
	)
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



	// function App() {
 
	// 	const [userIsLog, setUserIsLog] = useState(false);
	
	// 	if (userIsLog == false && localStorage.token)
	// 		setUserIsLog(true);
	
	// 	if (userIsLog === false)	
	// 		return <Connexion />;
	// 	else if (userIsLog === true)
	// 		return <Application />;
	// 	return <Application />;
	// }
	