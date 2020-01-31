import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { SnackbarProvider } from 'notistack';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Header from '../Header/Header';
import Foooter from '../Footer/Footer';
import Homepage from '../../containers/Homepage/Homepage';
import Account from '../../containers/Account/Account';
import Logout from '../Logout/Logout';
import NoMatch from '../NoMatch/NoMatch';

function Application() {
	return (
		<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
			<BrowserRouter>
				<Header />				
				<Switch>
					<Route exact path="/" component={Homepage} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/account" component={Account} />
					<Route path="*" component={NoMatch} />
				</Switch>
				<Foooter />
			</BrowserRouter>
		</SnackbarProvider>
	);
}

export default Application;