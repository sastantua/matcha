import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { SnackbarProvider } from 'notistack';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Header from '../Header/Header';
import Foooter from '../Footer/Footer';
import Homepage from '../allPages/Homepage/Homepage';
import Account from '../allPages/Account/Account';
import NoMatch from '../NoMatch/NoMatch';
import Connexion from '../Connexion/Connexion';

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

export default Application;