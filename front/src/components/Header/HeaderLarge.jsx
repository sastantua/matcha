import React, {useState, useContext } from 'react';

import { SideList } from "./Sidelist";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Badge } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Mail as MailIcon, Notifications as NotificationsIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons';

import './Header.css';

	
function HeaderLarge(props) {

	const classes = props.useStyles();
	
	return (
		<AppBar position="static" id="header-large">
			<Toolbar id="toolbar">
				<div id="header-large-left">
					<IconButton onClick={props.toggleDrawer('left', true)} edge="start" color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Drawer classes={{ paper: classes.paper }} open={props.state.left} onClose={props.toggleDrawer('left', false)} style={{background: "#FFF"}}>
						{SideList('left', props)}
					</Drawer>
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
				<div id="header-large-right">
					<IconButton component={Link} to="/message" className="mail" edge="start" color="inherit" aria-label="menu">
						<Badge badgeContent={4} color="secondary">
							<MailIcon />
						</Badge>
					</IconButton>
					<IconButton component={Link} to="/notification" className="notif" edge="start" color="inherit" aria-label="menu">
						<Badge badgeContent={10} color="secondary">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton onClick={props.handleClick} className="notif" edge="start" color="inherit" aria-label="menu">
						<ExitToAppIcon style={{ color: '#FFF' }} badgeContent={10} color="secondary" />
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default HeaderLarge;