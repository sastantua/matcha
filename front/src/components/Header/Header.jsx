import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import NotificationsIcon from '@material-ui/icons/Notifications';
import './Header.css';

const useStyles = makeStyles({
	list: {
	  width: 250,
	},
	fullList: {
	  width: 'auto',
	},
  });
  






function Header() {
	// const classes = useStyles();
	let windowWidth = window.innerWidth;
	console.log(windowWidth);

	const classes = useStyles();
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
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(side, false)}
			onKeyDown={toggleDrawer(side, false)}
		>
		<Button color="inherit" size="small">
			<Link to="/" style={{ color: '#FFF' }}>
				home
			</Link>
		</Button>
		<Button color="inherit" size="small">
			<Link to="/account" style={{ color: '#FFF' }}>
				account
			</Link>
		</Button>
		<Button color="inherit" size="small">
			<Link to="/match" style={{ color: '#FFF' }}>
				match
			</Link>
		</Button>
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
						<IconButton className="mail" edge="start" color="inherit" aria-label="menu">
							<Badge badgeContent={4} color="secondary">
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton className="notif" edge="start" color="inherit" aria-label="menu">
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
						<IconButton className="mail" edge="start" color="inherit" aria-label="menu">
							<Badge badgeContent={4} color="secondary">
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton className="notif" edge="start" color="inherit" aria-label="menu">
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
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon onClick={toggleDrawer('left', true)} />
					</IconButton>
					<Drawer open={state.left} onClose={toggleDrawer('left', false)}>
						{/* <div id="header-small-left"> */}
						{/* </div> */}
						{sideList('left')}
					</Drawer>
					<div id="header-small-right">
						<IconButton className="mail" edge="start" color="inherit" aria-label="menu">
							<Badge badgeContent={4} color="secondary">
								<MailIcon size="small" />
							</Badge>
						</IconButton>
						<IconButton className="notif" edge="start" color="inherit" aria-label="menu">
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