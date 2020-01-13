import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Menu from './Header/Header';
import Foooter from './Footer/Footer';
import Homepage from './allFeatures/Homepage/Homepage';
import NoMatch from './NoMatch';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Menu />
				<div id="pageContainer">
					<Switch>
						<Route exact path="/" component={Homepage} />
						<Route path="*" component={NoMatch} />
					</Switch>
				</div>
				<Foooter />
			</BrowserRouter>
		)
	}
}

export default App;