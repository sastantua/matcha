import React, { useState } from 'react';
import api from '../../api/api'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PowerIcon from '@material-ui/icons/Power';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: "#FF3860",
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

function CustomNestedList() {
	const classes = useStyles();
	
	const [open, setOpen] = useState(false);
	const [gender, setGender] = useState(null);

	const handleOpen = () => {
		setOpen(!open);
	};

	api.get('/gender')
	.then((res) => {
		console.log(res);
		setGender(res.data);
	})
	.catch((err) => {console.log(err);})

	console.log(gender);

	return (
		<List component="nav" aria-labelledby="nested-list-subheader" className={classes.root} >
			<ListItem button onClick={handleOpen}>
				<ListItemIcon>
					<PowerIcon />
				</ListItemIcon>
				<ListItemText primary="Sex" />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={classes.nested}>
						<ListItemText primary="Male" />
					</ListItem>
					<ListItem button className={classes.nested}>
						<ListItemText primary="Female" />
					</ListItem>
					<ListItem button className={classes.nested}>
						<ListItemText primary="In between" />
					</ListItem>
					<ListItem button className={classes.nested}>
						<ListItemText primary="Other" />
					</ListItem>
				</List>
			</Collapse>
		</List>
	);
}

export default CustomNestedList;