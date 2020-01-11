import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Menu from './Menu/Menu';
import Homepage from './features/Homepage/Homepage';
import NoMatch from './NoMatch';

class App extends React.Component {
	render() {
        return (
            <BrowserRouter>
                <Menu />
                <Switch>
                    <Route exact path="/" component={Homepage} />

                    <Route path="*" component={NoMatch} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;