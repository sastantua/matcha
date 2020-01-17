import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Header from './Header/Header';
import Foooter from './Footer/Footer';
import Signup from './allFeatures/Signup/Signup';
import Login from './allFeatures/Login/Login';
import Homepage from './allFeatures/Homepage/Homepage';
import NoMatch from './NoMatch';

const isLog = 0;

class App extends React.Component {
	render() {
		if (isLog === 0) {
			return (
				<BrowserRouter>
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
					<Route path="*" component={NoMatch} />
				</BrowserRouter>
			);
		}
		else {
			return (
				<BrowserRouter>
				<Header />				
					<Switch>
						<Route exact path="/" component={Homepage} />
						{/* <Route exact path="/account" component={Account} /> */}
						<Route path="*" component={NoMatch} />
					</Switch>
				<Foooter />
			</BrowserRouter>
		);
		}
	}
}

export default App;