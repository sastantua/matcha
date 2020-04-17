import React, { useEffect, useContext } from 'react';
import styled from "styled-components";
import { useHistory, Link } from 'react-router-dom';
import api from '../../api/api'
import { COLORS, BREAK_POINTS } from '../../config/style'
import { UserContext } from '../../context/UserContext';
import { notifSocket } from '../../api/socket';
import { useImmer } from 'use-immer';

const Typography = styled.span`
	display: none;
	margin-left: 1rem;
`

const Element = styled.li`
	width: 100%;
`

const Logo = styled(Element)`
	font-weight: bold;
	background-color: ${COLORS.BLACK_LIGHT};
  	text-transform: uppercase;
  	margin-bottom: 1rem;
  	text-align: center;
  	color: ${COLORS.GREY_LIGHT};
  	font-size: 1.5rem;
  	letter-spacing: 0.3ch;
	& > svg {
		transform: rotate(0deg);
		transition: 600ms;
	}
	& > span {
		display: inline;
		position: absolute;
		left: -999px;
		transition: 600ms;
	}
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		display: none;
	}
`

const Navigation = styled.div`
	position: fixed;
	z-index: 999;
	background-color: ${COLORS.BLACK};
	transition: width 600ms ease;
	&:hover ${Logo} > svg {
		transform: rotate(-180deg);
	}
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		bottom: 0;
		width: 100vw;
		height: 5rem;
		&:hover ${Typography} {
			display: none;
		}
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		top: 0;
		width: 5rem;
		height: 100vh;
		&:hover {
			width: 16rem;
		}
		&:hover ${Typography} {
			display: inline;
		}
		&:hover ${Logo} > span {
			left: 0px;
		}
	}
`

const Container = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: center;
	list-style: none;
	margin: 0;
	padding: 0;
	height: 100%;
	& > li:last-child {
		margin-top: auto;
	}
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		flex-direction: row;
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {

	}
`

const SLink = styled(Link)`
	display: flex;
	align-items: center;
	height: 5rem;
	text-decoration: none;
	color: ${COLORS.GREY};
	filter: grayscale(100%) opacity(.7);
	transition: 600ms;
	&:hover {
		filter: grayscale(0%) opacity(1);
		background-color: ${COLORS.BLACK_LIGHT};
		color: ${COLORS.GREY_LIGHT};
	}
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		justify-content: center;
	}
`

const Icon = styled.i`
	color: ${COLORS.PINK};
	width: 2rem;
	font-size: 2rem;
  	min-width: 2rem;
  	margin: 0 1.5rem;
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
		<Navigation>
			<Container>
				<Logo>
					<SLink to={"/"}>
						<Typography>Matcha</Typography>
						<Icon className="fas fa-grin-hearts fa-lg"></Icon>
					</SLink>
				</Logo>
				<Element>
					<SLink to="/match">
						<Icon className="fab fa-hotjar fa-lg"></Icon>
						<Typography>Match</Typography>
					</SLink>
				</Element>
				<Element>
					<SLink to="/search">
						<Icon className="fas fa-search fa-lg"></Icon>
						<Typography>Search</Typography>
					</SLink>
				</Element>
				<Element>
					<SLink to="/chat">
						<Icon className="fas fa-comment-dots fa-lg"></Icon>
						<Typography>Chat</Typography>
					</SLink>
				</Element>
				<Element>
					<SLink to="/account">
						<Icon className="fas fa-user fa-lg"></Icon>
						<Typography>Account</Typography>
					</SLink>
				</Element>
				<Element onClick={handleClick}>
					<SLink to="/">
						<Icon className="fas fa-sign-out-alt fa-lg"></Icon>
						<Typography>Logout</Typography>
					</SLink>
				</Element>
			</Container>
		</Navigation>
	);

}

export default Header;