import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Button, green } from '@material-ui/core';
import { Badge, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { Menu as MenuIcon, Email as EmailIcon, Favorite as FavoriteIcon, BrightnessHigh as BrightnessHighIcon } from '@material-ui/icons';
import { AccountCircle as AccountCircleIcon, Mail as MailIcon, Notifications as NotificationsIcon } from '@material-ui/icons';

import './Header.css';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
	paper: {
		background: "",
		color: 'white'
	}
});


	
function Header() {
	let windowWidth = window.innerWidth;
	console.log(windowWidth);

	const classes = useStyles();

	const styles = {
		paper: {
		  background: "blue"
		}
	}

	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});
	
	const toggleDrawer = (side, open) => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
		return;
		}
	
		setState({ ...state, [side]: open });
	};

	const sideList = side => (
		<div className={classes.list} role="presentation" onClick={toggleDrawer(side, false)} onKeyDown={toggleDrawer(side, false)}>
			<List>
				<ListItem button component={Link} to="/home">
					<ListItemIcon><BrightnessHighIcon color='secondary' /></ListItemIcon>
					<ListItemText primary='Home' />
				</ListItem>
				<ListItem button component={Link} to="/account">
					<ListItemIcon><AccountCircleIcon color='secondary' /></ListItemIcon>
					<ListItemText primary='Account' />
				</ListItem>
				<ListItem button component={Link} to="/match">
					<ListItemIcon><FavoriteIcon color='secondary' /></ListItemIcon>
					<ListItemText primary='Match' />
				</ListItem>	
			</List>
			<Divider />
			<List>
				<ListItem button component={Link} to="/message">
					<ListItemIcon><EmailIcon color='secondary' /></ListItemIcon>
					<ListItemText primary='Messages' />
				</ListItem>
				<ListItem button component={Link} to="/notification">
					<ListItemIcon><NotificationsIcon color='secondary' /></ListItemIcon>
					<ListItemText primary='Notifications' />
				</ListItem>
			</List>
		</div>
	);

	if (windowWidth >= 1024) {
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
					</div>
				</Toolbar>
			</AppBar>
		);
	}
	else if (windowWidth >= 720) {
		return (
			<AppBar position="static" id="header-medium">
				<Toolbar>
					<div id="header-medium-left">
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
					<div id="header-medium-right">
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
					</div>
				</Toolbar>
			</AppBar>
		);
	}
	else {
		return (
			<AppBar position="static" id="header-small">
				<Toolbar>
					<IconButton onClick={toggleDrawer('left', true)} edge="start" color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Drawer classes={{ paper: styles.paper }} open={state.left} onClose={toggleDrawer('left', false)} style={{background: "#FFF"}}>
						{sideList('left')}
					</Drawer>
					<div id="header-small-right">
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
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

export default Header;

// https://neo4j.com/download-thanks/?edition=community&release=4.0.0&flavour=unix