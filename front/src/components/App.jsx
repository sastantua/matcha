import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Header from './Header/Header';
import Foooter from './Footer/Footer';
// import Choice from './Choice/Choice';

import Signup from './allPages/Signup/Signup';
import Login from './allPages/Login/Login';
import Homepage from './allPages/Homepage/Homepage';
import Account from './allPages/Account/Account';
import NoMatch from './NoMatch/NoMatch';

const isLog = 0;

class App extends React.Component {
	render() {
		if (isLog === 0) {
			return (
				<BrowserRouter>
					<Switch>
						{/* <Route exact path="/" component={Choice} /> */}
						<Route exact path="/" component={Login} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
						<Route path="*" component={NoMatch} />
					</Switch>
				</BrowserRouter>
			);
		}
		else {
			return (
				<BrowserRouter>
				<Header />				
					<Switch>
						<Route exact path="/" component={Homepage} />
						<Route exact path="/account" component={Account} />
						<Route path="*" component={NoMatch} />
					</Switch>
				<Foooter />
			</BrowserRouter>
		);
		}
	}
}

export default App;