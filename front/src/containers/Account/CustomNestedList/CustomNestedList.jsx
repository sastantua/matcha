import React, { useState } from 'react';
import api from '../../../api/api'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PowerIcon from '@material-ui/icons/Power';
import FlareIcon from '@material-ui/icons/Flare';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: "rgba(255, 56, 96, 0.1)",
		color: "#FF3860",
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

function CustomNestedList() {
	const classes = useStyles();
	
	const [gender, setGender] = useState([]);
	const [orientation, setOrientation] = useState([]);
	const [openGender, setOpenGender] = useState(false);
	const [openOrientation, setOpenOrientation] = useState(false);

	const handleOpenGender = () => {
		setOpenGender(!openGender);
		if (!gender.length) {
			api.get('/gender')
			.then((res) => {setGender(res.data);})
			.catch((err) => {console.log(err);})
		}
	};

	const handleOpenOrientation = () => {
		setOpenOrientation(!openOrientation);
		if (!gender.length) {
			api.get('/gender')
			.then((res) => {setOrientation(res.data);})
			.catch((err) => {console.log(err);})
		}
	};

	const handleChooseGender = (name, id) => {
		api.post('/user/gender', id)
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

	const handleChooseOrientation = (name, id) => {
	// 	api.post('/user/gender', id)
	// 	.then((res) => {console.log(res)})
	// 	.catch((err) => {console.log(err);})
	// 	console.log(name);
	// 	console.log(id);
	}

	const orientationList = orientation.map(text =>
		<ListItem button key={text._id} className={classes.nested} value={text._id} onClick={() => handleChooseOrientation(text.name, text._id)} >
			<ListItemText primary={text.name} />
		</ListItem>
	);


	return (
		<>
		<List component="nav" aria-labelledby="nested-list-subheader" className={classes.root} >
			<ListItem button onClick={handleOpenGender}>
				<ListItemIcon>
					<PowerIcon />
				</ListItemIcon>
				<ListItemText primary="Sex" /> 
				{ /* mettre user.gender au lieu de sexe api.get(/gender) */ }
				{openGender ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={openGender} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{ genderList }
				</List>
			</Collapse>
		</List>

		<List component="nav" aria-labelledby="nested-list-subheader" className={classes.root} >
			<ListItem button onClick={handleOpenOrientation}>
				<ListItemIcon>
					<FlareIcon />
				</ListItemIcon>
				<ListItemText primary="Orientation" /> 
				{ /* mettre user.gender au lieu de orientation api.get(/?) */ }
				{openOrientation ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={openOrientation} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{ orientationList }
				</List>
			</Collapse>
		</List>
		</>
	);
}

export default CustomNestedList;