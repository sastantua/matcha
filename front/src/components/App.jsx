import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import usePosition from '../hooks/usePosition';
import { UserContext } from '../context/UserContext'
import api from '../api/api';
import { COLORS, BREAK_POINTS } from '../config/style';


import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { SnackbarProvider } from 'notistack';
import dotenv from 'dotenv';

import Homepage from '../containers/Homepage/Homepage';
import Account from '../containers/Account/Account';
import Match from '../containers/Match/Match';
import Search from '../containers/Search/Search';
import Profile from '../containers/Profile/Profile';
import Reset from '../containers/Reset/Reset';
import Chat from '../containers/Chat';

import Signup from '../containers/Signup/Signup';
import Login from '../containers/Login/Login';
import NoMatch from '../containers/NoMatch/NoMatch';
import Header from './Header/Header';


dotenv.config();

const AppContainer = styled.div`
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		margin-left: 5rem;
	}
	background-color: ${COLORS.BLACK_LIGHT};
	width: 100%;
	height: 100%;
`

const AuthenticatedRoute = ({ component: Component, ...rest}) => {
	return (
	<Route 
		{...rest}
		render = { props => {
			if (localStorage.getItem("token"))
				return (<Component {...props} />)
			return (<Redirect to={{pathname: '/login', state: {from: props.location }}} />);
		}}
	/>
	)
}

function App() {
	const [user, setUser] = useState(null);
	const {latitude, longitude} = usePosition();
	const userMemo = useMemo(() => ({ user, setUser }), [user, setUser]);
	
	useEffect(() => {
		if (user) {
			api.post('/user/location', {lat: latitude, lng: longitude})
			.catch(err => console.log(err))
		}
	}, [user]);
	
	if (localStorage.getItem('token') && !api.defaults.headers.common['Authorization']) {
		api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
		api.get('/user/me').then((res) => {setUser(res.data);}).catch(err => console.log(err));
	}

	return (
		<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
			<UserContext.Provider value={ userMemo }>
				<BrowserRouter>
					<Header />
						<AppContainer>
							<Switch>
								<Route exact path="/login" component={Login} />
								<Route exact path="/signup" component={Signup} />
								<Route exact path="/reset" component={Reset} />
								<Route exact path="/" component={Homepage} />
								<Route exact path="/home" component={Homepage} />
								<AuthenticatedRoute exact path="/account" component={Account} />
								<AuthenticatedRoute exact path="/match" component={Match} />
								<AuthenticatedRoute exact path="/search" component={Search} />
								<AuthenticatedRoute exact path="/profile" component={Profile} />
								<AuthenticatedRoute exact path="/chat" component={Chat} />
								<Route path="*" component={NoMatch} />
							</Switch>
						</AppContainer>
					</BrowserRouter>
			</UserContext.Provider>
		</SnackbarProvider>
	)
}

export default App;