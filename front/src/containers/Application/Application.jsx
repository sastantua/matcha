import React, {useState} from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom"
import { SnackbarProvider } from 'notistack';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Header from '../../components/Header/Header';
import Foooter from '../../components/Footer/Footer';
import Homepage from '../Homepage/Homepage';
import Account from '../Account/Account';
import Logout from '../Logout/Logout';
import NoMatch from '../NoMatch/NoMatch';
import { UserContext } from '../../context/UserContext';

function Application() {

	return (
		<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
			<UserContext.Provider value={{ userData, setUserData }}>
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
			</UserContext.Provider>
		</SnackbarProvider>
	);
}

export default Application;