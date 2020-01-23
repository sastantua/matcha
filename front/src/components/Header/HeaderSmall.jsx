import React from 'react';
import { Link } from 'react-router-dom';
import { SideList } from "./Sidelist";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Badge, Drawer } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Mail as MailIcon, Notifications as NotificationsIcon } from '@material-ui/icons';

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
	
function HeaderSmall() {

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
			return ;
		}
	
		setState({ ...state, [side]: open });
	};

	return (
		<AppBar position="static" id="header-small">
			<Toolbar>
				<IconButton onClick={toggleDrawer('left', true)} edge="start" color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Drawer classes={{ paper: styles.paper }} open={state.left} onClose={toggleDrawer('left', false)} style={{background: "#FFF"}}>
					{SideList('left')}
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

export default HeaderSmall;