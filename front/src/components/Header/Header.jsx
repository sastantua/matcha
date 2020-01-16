import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import './Header.css';
// import { Navbar } from 'react-bulma-components';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

function Header() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar position="static" id="header">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Button className={classes.title} color="inherit">
						<Link to="/" style={{ color: '#FFF' }}>
							home
						</Link>
					</Button>
					<Button className={classes.title} color="inherit">
						<Link to="/account" style={{ color: '#FFF' }}>
							account
						</Link>
					</Button>
					<Button className={classes.title} color="inherit">
						<Link to="/match" style={{ color: '#FFF' }}>
							match
						</Link>
					</Button>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MailIcon />
					</IconButton>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<NotificationsIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>

		// <Navbar id="header">
		// 	<Navbar.Brand>
		// 		<Navbar.Item>
		// 			<img src={logo} alt="app logo"/>
		// 		</Navbar.Item>
		// 	</Navbar.Brand>
		// 	<Navbar.Menu>
		// 		<Navbar.Container>
		// 			<Navbar.Item renderAs="p">
		// 				<Link to="/" style={{ color: '#FFF' }}>
		// 					Home
		// 				</Link>
		// 			</Navbar.Item>
		// 			<Navbar.Item renderAs="p">
		// 				<Link to="/account" style={{ color: '#FFF' }}>
		// 					Account
		// 				</Link>
		// 			</Navbar.Item>
		// 			<Navbar.Item renderAs="p">
		// 				<Link to="/" style={{ color: '#FFF' }}>
		// 					Match
		// 				</Link>
		// 			</Navbar.Item>
		// 			<Navbar.Item renderAs="p">
		// 				<Link to="/" style={{ color: '#FFF' }}>
		// 					Message
		// 				</Link>
		// 			</Navbar.Item>
		// 		</Navbar.Container>
		// 		<Navbar.Container position="end">
		// 			<Navbar.Item dropdown hoverable>
		// 				<Navbar.Link arrowless={false}>
		// 					<img src="https://via.placeholder.com/150" alt="test"/>
		// 				</Navbar.Link>
		// 				<Navbar.Dropdown style={{ background: '#ff3860' }} className="is-right">
		// 					<Navbar.Item renderAs="p" >
		// 						<Link to='/notification'>
		// 							Notification
		// 						</Link>
		// 					</Navbar.Item>
		// 					<Navbar.Item renderAs="p" >
		// 						Logout
		// 					</Navbar.Item>
		// 				</Navbar.Dropdown>
		// 			</Navbar.Item>
		// 		</Navbar.Container>
		// 	</Navbar.Menu>
		// </Navbar>
	);
}

export default Header;