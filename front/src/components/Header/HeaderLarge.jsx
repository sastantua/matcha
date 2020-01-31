import React, {useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Badge } from '@material-ui/core';
import { Mail as MailIcon, Notifications as NotificationsIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons';

import './Header.css';
	
function HeaderLarge() {

	// const [userIsLog, setUserIsLog] = useState(false);
	// const [, ] = useContext();
	

	return (
		<AppBar position="static" id="header-large">
			<Toolbar id="toolbar">
				<div id="header-large-left">
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
					<IconButton component={Link} to="/logout" className="notif" edge="start" color="inherit" aria-label="menu">
						<ExitToAppIcon style={{ color: '#FFF' }} badgeContent={10} color="secondary" />
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default HeaderLarge;