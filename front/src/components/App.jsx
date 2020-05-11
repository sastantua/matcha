import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import api from '../api/api';
import usePosition from '../hooks/usePosition';
import { UserContext } from '../context/UserContext'
import { NotificationsProvider } from '../context/NotificationsProvider';
import { BREAK_POINTS } from '../config/style';
import { notifSocket, chatSocket } from '../api/socket';

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { SnackbarProvider } from 'notistack';

import Homepage from '../containers/Homepage/Homepage';
import Account from '../containers/Account/Account';
import Match from '../containers/Match/Match';
import Search from '../containers/Search/Search';
import Saw from '../containers/Saw/Saw';
import Profile from '../containers/Profile/Profile';
import Reset from '../containers/Reset/Reset';
import Chat from '../containers/Chat';
import Map from '../containers/Map/Map';
import Unblock from '../containers/Unblock/Unblock';

import Signup from '../containers/Signup/Signup';
import Login from '../containers/Login/Login';
import Verify from '../containers/Verify/Verify';
import Password from '../containers/Password/Password';
import NotFound from '../containers/NotFound/NotFound';
import Header from './Header/Header';
import Notifications from '../containers/Notifications/Notifications';

const AppContainer = styled.div`
	display: flex;
	justify-content: center;
	flex: 1;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		margin-left: 5rem;
		min-height: 100vh;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		margin-bottom: 5rem;
	}
	& > * {
		width: 100%;
	}
	height: auto;
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
	const [user, setUser] = useState(undefined);
	const {latitude, longitude} = usePosition();

	useEffect(() => {
		return () => {
			notifSocket.emit('disconnect');
			chatSocket.emit('disconnect');
		}
	}, []);

	useEffect(() => {
		if (user) {
			notifSocket.emit('connected', user._id);
		}
	}, [user])

	useEffect(() => {
		const getPosition = () => {
			if (latitude !== undefined && longitude !== undefined) {
				api.post('/user/location', {lat: latitude, lng: longitude})
				.catch(err => console.log(err))
			}
		}
		if (user) {
			getPosition();
		}
	}, [user, latitude, longitude]);

	if (localStorage.getItem('token') && !api.defaults.headers.common['Authorization']) {
		api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
		api.get('/user/me').then((res) => {setUser(res.data);}).catch(err => {
			delete api.defaults.headers.common['Authorization'];
			console.log(err);
		});
	}

	return (
		<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
			<UserContext.Provider value={[user, setUser]}>
				<NotificationsProvider>
					<BrowserRouter>
						<Header />
						<AppContainer>
							<Switch>
								<Route exact path="/" component={Homepage} />
								<Route exact path="/home" component={Homepage} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/reset" component={Reset} />
								<Route exact path="/password/:token" component={Password} />
								<Route exact path="/signup" component={Signup} />
								<Route exact path="/verify/:token" component={Verify} />
								<AuthenticatedRoute exact path="/saw" component={Saw} />
								<AuthenticatedRoute exact path="/map" component={Map} />
								<AuthenticatedRoute exact path="/chat" component={Chat} />
								<AuthenticatedRoute exact path="/match" component={Match} />
								<AuthenticatedRoute exact path="/search" component={Search} />
								<AuthenticatedRoute exact path="/account" component={Account} />
								<AuthenticatedRoute exact path="/profile" component={Profile} />
								<AuthenticatedRoute exact path="/unblock" component={Unblock} />
								<AuthenticatedRoute exact path="/notifications" component={Notifications} />
								<Route path="*" component={NotFound} />
							</Switch>
						</AppContainer>
					</BrowserRouter>
				</NotificationsProvider>
			</UserContext.Provider>
		</SnackbarProvider>
	)
}

export default App;