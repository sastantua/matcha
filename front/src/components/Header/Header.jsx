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

const SSvg = styled.svg`
	color: ${COLORS.PINK};
	width: 2rem;
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
						<SSvg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="grin-hearts" class="svg-inline--fa fa-grin-hearts fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM90.4 183.6c6.7-17.6 26.7-26.7 44.9-21.9l7.1 1.9 2-7.1c5-18.1 22.8-30.9 41.5-27.9 21.4 3.4 34.4 24.2 28.8 44.5L195.3 243c-1.2 4.5-5.9 7.2-10.5 6l-70.2-18.2c-20.4-5.4-31.9-27-24.2-47.2zM248 432c-60.6 0-134.5-38.3-143.8-93.3-2-11.8 9.2-21.5 20.7-17.9C155.1 330.5 200 336 248 336s92.9-5.5 123.1-15.2c11.4-3.6 22.6 6.1 20.7 17.9-9.3 55-83.2 93.3-143.8 93.3zm133.4-201.3l-70.2 18.2c-4.5 1.2-9.2-1.5-10.5-6L281.3 173c-5.6-20.3 7.4-41.1 28.8-44.5 18.6-3 36.4 9.8 41.5 27.9l2 7.1 7.1-1.9c18.2-4.7 38.2 4.3 44.9 21.9 7.7 20.3-3.8 41.9-24.2 47.2z"></path></SSvg>
					</SLink>
				</Logo>
				<Element>
					<SLink to="/match">
						<SSvg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="hotjar" class="svg-inline--fa fa-hotjar fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M414.9 161.5C340.2 29 121.1 0 121.1 0S222.2 110.4 93 197.7C11.3 252.8-21 324.4 14 402.6c26.8 59.9 83.5 84.3 144.6 93.4-29.2-55.1-6.6-122.4-4.1-129.6 57.1 86.4 165 0 110.8-93.9 71 15.4 81.6 138.6 27.1 215.5 80.5-25.3 134.1-88.9 148.8-145.6 15.5-59.3 3.7-127.9-26.3-180.9z"></path></SSvg>
						<Typography>Match</Typography>
					</SLink>
				</Element>
				<Element>
					<SLink to="/search">
						<SSvg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></SSvg>
						<Typography>Search</Typography>
					</SLink>
				</Element>
				<Element>
					<SLink to="/chat">
						<SSvg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comments" class="svg-inline--fa fa-comments fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></SSvg>
						<Typography>Chat</Typography>
					</SLink>
				</Element>
				<Element>
					<SLink to="/account">
						<SSvg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></SSvg>
						<Typography>Account</Typography>
					</SLink>
				</Element>
				<Element>
					<SLink to="/logout">
						<SSvg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comments" class="svg-inline--fa fa-comments fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></SSvg>
						<Typography>Logout</Typography>
					</SLink>
				</Element>
			</Container>
		</Navigation>
	);

}

export default Header;