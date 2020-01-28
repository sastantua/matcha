import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { SnackbarProvider } from 'notistack';

import Signup from '../allPages/Signup/Signup';
import Login from '../allPages/Login/Login';
import NoMatch from '../NoMatch/NoMatch';

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

export default Connexion;