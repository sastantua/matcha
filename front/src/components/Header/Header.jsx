import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import EmailIcon from '@material-ui/icons/Email';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { green } from '@material-ui/core/colors';

import './Header.css';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
	paper: {
		background: "blue",
		color: 'white'
	}
});

const styles = {
	paper: {
		backgroundColor: "blue"
	}
}
	
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
		<div className={classes.list} role="presentation" onClick={toggleDrawer(side, false)} onKeyDown={toggleDrawer(side, false)}>
			<List>
				<ListItem button>
					<ListItemIcon><BrightnessHighIcon color='secondary' /></ListItemIcon>
					<ListItemText primary='Home' />
				</ListItem>
				<ListItem button>
					<ListItemIcon><AccountCircleIcon color='secondary' /></ListItemIcon>
					<ListItemText primary='Account' />
				</ListItem>
				<ListItem button>
					<ListItemIcon><FavoriteIcon color='secondary' /></ListItemIcon>
					<ListItemText primary='Match' />
				</ListItem>	
			</List>
			<Divider />
			<List>
				<ListItem button>
					<ListItemIcon><EmailIcon color='secondary' /></ListItemIcon>
					<ListItemText primary='Messages' />
				</ListItem>
				<ListItem button>
					<ListItemIcon><NotificationsIcon color='secondary' /></ListItemIcon>
					<ListItemText primary='Notifications' />
				</ListItem>
			</List>
		</div>
	);

	// const sideList = side => (
	// 	<div className={classes.list} role="presentation" onClick={toggleDrawer(side, false)} onKeyDown={toggleDrawer(side, false)}>
	// 		<List>
	// 			{['Home', 'Account', 'Match'].map((text, index) => (
	// 				<ListItem button key={text}>
	// 					<ListItemIcon>{index % 2 === 0 ? <FavoriteIcon color='secondary' /> : <MailIcon style={{ color: green[500] }}/>}</ListItemIcon>
	// 					<ListItemText primary={text} />
	// 				</ListItem>
	// 			))}
	// 		</List>
	// 		<Divider />
	// 		<List>
	// 			{['Messages', 'Notifications'].map((text, index) => (
	// 				<ListItem button key={text}>
	// 					<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
	// 					<ListItemText primary={text} />
	// 				</ListItem>
	// 		))}
	// 		</List>
	// 	</div>
	// );

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
					<Drawer classes={{ paper: styles.paper }} open={state.left} onClose={toggleDrawer('left', false)} style={{background: "#FFF"}}>
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