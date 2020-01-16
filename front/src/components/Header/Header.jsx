import React from 'react';
import { Link } from 'react-router-dom';

// import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import './Header.css';

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		flexGrow: 1,
// 	},
// 	menuButton: {
// 		marginRight: theme.spacing(2),
// 	},
// 	title: {
// 		flexGrow: 1,
// 	},
// }));

function Header() {
	// const classes = useStyles();
	return (
			<AppBar position="static" id="header">
				<Toolbar>
				<div id="header-left">
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Button color="inherit">
						<Link to="/" style={{ color: '#FFF' }}>
							home
						</Link>
					</Button>
					<Button color="inherit">
						<Link to="/account" style={{ color: '#FFF' }}>
							account
						</Link>
					</Button>
					<Button color="inherit">
						<Link to="/match" style={{ color: '#FFF' }}>
							match
						</Link>
					</Button>
				</div>
				<div id="header-right">
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MailIcon />
					</IconButton>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<NotificationsIcon />
					</IconButton>
				</div>
				</Toolbar>
			</AppBar>
	);
}

export default Header;