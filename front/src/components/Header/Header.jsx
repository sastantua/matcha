import React from 'react';
import styled from "styled-components";
import { styled as styledMaterial } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link, useHistory } from 'react-router-dom';
import { SideList } from "./Sidelist";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Badge, Drawer } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Mail as MailIcon, Notifications as NotificationsIcon } from '@material-ui/icons';

import api from '../../api/api'
import { colors, device } from '../../config/style'

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
	paper: {
		background: "#ff3860",
		color: 'white'
	}
});

// const matches = useMediaQuery(device.mobileS);
// @media ${device.mobileS} {
// 	height: 8vh;
// }
// @media ${device.tablet} {
// 	height: 5vh;
// }

const HeaderContainer = styled(AppBar)({
	position: "fixed",
	top: "0",
	zIndex: "2",
	height: "10vh",
	width: "100vw",
	backgroundColor: `${colors.two}`
});

const HeaderRightContainer = styled.div`
	right: 0;
	position: fixed;
	margin-right: 1vw;
`

function Header() {
	const classes = useStyles();
	const history = useHistory();

	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});	
	
	const toggleDrawer = (side, open) => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return ;
		}
	
		setState({ ...state, [side]: open });
	};

	const handleClick = () => {
		api.post('/user/logout')
		.then(() => {
			localStorage.removeItem("token");
			delete api.defaults.headers.common['Authorization'];
			history.push("/login");
		})
		.catch((err) => console.log(`${err.response.data.message}`));
	}

	return (
		<HeaderContainer position="static">
			<Toolbar style={{height: "10vh"}}>
				<IconButton onClick={toggleDrawer('left', true)} edge="start" color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Drawer classes={{ paper: classes.paper }} open={state.left} onClose={toggleDrawer('left', false)} style={{background: "#FFF"}}>
					{SideList('left', handleClick)}
				</Drawer>
				<HeaderRightContainer>
					<IconButton component={Link} to="/message" className="mail" edge="start" color="inherit" aria-label="menu">
						<Badge badgeContent={4} color="secondary">
							<MailIcon size="small" />
						</Badge>
					</IconButton>
					<IconButton component={Link} to="/notification" className="notif" edge="start" color="inherit" aria-label="menu">
						<Badge badgeContent={10} color="secondary">
							<NotificationsIcon size="small" />
						</Badge>
					</IconButton>
				</HeaderRightContainer>
			</Toolbar>
		</HeaderContainer>
	);

}

export default Header;