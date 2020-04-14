import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { Email as EmailIcon, Favorite as FavoriteIcon, BrightnessHigh as BrightnessHighIcon, Lock as LockIcon } from '@material-ui/icons';
import { AccountCircle as AccountCircleIcon, Notifications as NotificationsIcon, ExitToApp as ExitToAppIcon, Search as SearchIcon } from '@material-ui/icons';

export const SideList = (side, props) => {
	
	const useStyles = makeStyles({
		list: {width: 250,},
		fullList: {width: 'auto',},
		paper: {background: "",color: 'white'}
	});
	
	const classes = useStyles();
	
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
	<div className={classes.list} role="presentation" onClick={toggleDrawer(side, false)} onKeyDown={toggleDrawer(side, false)}>
		<List>
			<ListItem button component={Link} to="/home">
				<ListItemIcon><BrightnessHighIcon style={{ color: "#FFF" }} /></ListItemIcon>
				<ListItemText primary='Home' />
			</ListItem>
			<ListItem button component={Link} to="/account">
				<ListItemIcon><AccountCircleIcon style={{ color: "#FFF" }} /></ListItemIcon>
				<ListItemText primary='Account' />
			</ListItem>
			<ListItem button component={Link} to="/match">
				<ListItemIcon><FavoriteIcon style={{ color: "#FFF" }} /></ListItemIcon>
				<ListItemText primary='Match' />
			</ListItem>
			<ListItem button component={Link} to="/search">
				<ListItemIcon><SearchIcon style={{ color: "#FFF" }} /></ListItemIcon>
				<ListItemText primary='Search' />
			</ListItem>
		</List>
		<Divider />
		<List>
			<ListItem button component={Link} to="/message">
				<ListItemIcon><EmailIcon style={{ color: "#FFF" }} /></ListItemIcon>
				<ListItemText primary='Messages' />
			</ListItem>
			<ListItem button component={Link} to="/notification">
				<ListItemIcon><NotificationsIcon style={{ color: "#FFF" }} /></ListItemIcon>
				<ListItemText primary='Notifications' />
			</ListItem>
		</List>
		<Divider />
		<List>
			<ListItem button component={Link} to="/password">
				<ListItemIcon><LockIcon style={{ color: "#FFF" }} /></ListItemIcon>
				<ListItemText primary='Change Password' />
			</ListItem>
			<ListItem button onClick={props.handleClick}>
				<ListItemIcon><ExitToAppIcon style={{ color: "#FFF" }} /></ListItemIcon>
				<ListItemText primary='Logout' />
			</ListItem>
		</List>
	</div>
	);
};
