import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Header from './Header/Header';
import Foooter from './Footer/Footer';
import Homepage from './allFeatures/Homepage/Homepage';
import NoMatch from './NoMatch';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Header />				
					<Switch>
						<Route exact path="/" component={Homepage} />
						<Route path="*" component={NoMatch} />
					</Switch>
				<Foooter />
			</BrowserRouter>
		)
	}
}

export default App;