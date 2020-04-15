import React, { useEffect, useContext } from 'react';
import styled from "styled-components";
import { useHistory, Link } from 'react-router-dom';
import api from '../../api/api'
import { COLORS, SPACING } from '../../config/style'
import { UserContext } from '../../context/UserContext';
import { notifSocket } from '../../api/socket';
import { useImmer } from 'use-immer';
import NotificationsIcon from '@material-ui/icons/Notifications';

const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 ${SPACING.BASE};
	width: 100%;
	height: 80px;
	background-color: ${COLORS.PINK};
	& > div:first-child {
		justify-content: flex-start;
	}
	& > div:last-child {
		justify-content: flex-end;
	}
`

const HeaderContent = styled.div`
	display: flex;
	width: 30%;
	justify-content: center;
	align-items: center;
`

const HeaderLogo = styled(Link)`
	color: ${COLORS.WHITE};
	font-size: 1.1em;
	font-weight: bold;
	text-transform: uppercase;
`

const HeaderLink = styled(Link)`
	color: ${COLORS.WHITE};
	margin: 0 ${SPACING.SM};
`

const HeaderPills = styled.div`
	display: flex;
	align-items: center;
	color: ${COLORS.WHITE};
	background-color: ${COLORS.PURPLE_LIGHT};
	padding: ${SPACING.XXS};
	border-radius: 50%;
	text-transform: uppercase;
	font-size: 0.75em;
	font-weight: 600;
	cursor: pointer;
`

function Header({ isLogged }) {
	const history = useHistory();
	const [notifications, addNotification] = useImmer([]);

	// useEffect(() => {
	// 	user && notifSocket.emit('connected', user._id);
	// })

	useEffect(() => {
		notifSocket.on('notification', data => 
			addNotification(draft => {
				draft.push(data);
			})
		)
	}, [addNotification])

	const handleClick = () => {
		if (isLogged) {
			api.post('/user/logout')
			.then(() => {
				localStorage.removeItem("token");
				delete api.defaults.headers.common['Authorization'];
				history.push("/login");
			})
			.catch((err) => console.log(`${err.response.data.message}`));
		} else {
			history.push('/login');
		}
	}

	return (
		<HeaderContainer>
			<HeaderContent>
				<HeaderLogo to={'/home'}>Matcha</HeaderLogo>
			</HeaderContent>
			<HeaderContent>
				<HeaderLink to={'/match'}>Match</HeaderLink>
				<HeaderLink to={'/search'}>Search</HeaderLink>
				<HeaderLink to={'/account'}>Account</HeaderLink>
				<HeaderLink to={'/chat'}>Chat</HeaderLink>
			</HeaderContent>
			<HeaderContent>
				<HeaderPills onClick={handleClick}>
					<NotificationsIcon fontSize="small"/>
				</HeaderPills>
				<HeaderLink to={'/logout'}>Logout</HeaderLink>
			</HeaderContent>
		</HeaderContainer>
	);

}

export default Header;