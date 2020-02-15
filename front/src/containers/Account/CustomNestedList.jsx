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
	const [gender, setGender] = useState([]);

	const handleOpen = () => {
		setOpen(!open);
		if (!gender.length) {
			api.get('/gender')
			.then((res) => {setGender(res.data);})
			.catch((err) => {console.log(err);})
		}
	};
	
	const handleChooseGender = (name, id) => {
		api.post('/user/gender')
		.then((res) => {console.log(res)})
		.catch((err) => {console.log(err);})
		console.log(name);
		console.log(id);
	}

	const genderList = gender.map(text =>
		<ListItem button key={text._id} className={classes.nested} value={text._id} onClick={() => handleChooseGender(text.name, text._id)} >
			<ListItemText primary={text.name} />
		</ListItem>
	);

	// console.log(genderList);

	return (
		<List component="nav" aria-labelledby="nested-list-subheader" className={classes.root} >
			<ListItem button onClick={handleOpen}>
				<ListItemIcon>
					<PowerIcon />
				</ListItemIcon>
				<ListItemText primary="Sex" /> 
				{ /* mettre user.gender au lieu de sexe api.get(/gender) */ }
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{ genderList }
				</List>
			</Collapse>
		</List>
	);
}

export default CustomNestedList;