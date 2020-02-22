import React, { useState } from 'react';
import api from '../../../api/api'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		background: '#FF3860',
		opacity: 0.6,
		color: "#000",
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

function OrientationDropdown(props) {
	const classes = useStyles();
	
	const [orientation, setOrientation] = useState(null);
	const [orientationList, setOrientationList] = useState([]);

	// Get orientation names from back
	const getOrientation = () => {
		api.get('/user/orientation')
		.then((res) => {
			setOrientation(res.data.name);
		})
		.catch((err) => {
			console.log(err);
		})
	};	
		
	// Open the orientation dropdown
	const handleOpenOrientation = () => {
		props.dropdowns.setOpenOrientation(!props.dropdowns.openOrientation);
		props.dropdowns.openGender && props.dropdowns.setOpenGender(!props.dropdowns.openGender);
		props.dropdowns.openHobby && props.dropdowns.setOpenHobby(!props.dropdowns.openHobby);
		if (!orientationList.length) {
			api.get('/orientation')
			.then((res) => {
				setOrientationList(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
		}
	};

	// Post selected orientation (id) to server
	const handleChooseOrientation = (name, id) => {
		let _id = {_id: id};
		api.post('/user/orientation', _id)
		.then((res) => {
			handleOpenOrientation();
		})
		.catch((err) => {
			console.log(err);
		})
	};

	// Create the jsx for the orientation selection list
	const orientationListJsx = orientationList.map(text => {
		return (
			<ListItem button key={text._id} className={classes.nested} value={text._id} onClick={() => handleChooseOrientation(text.name, text._id)} >
				<ListItemText primary={text.name} />
			</ListItem>
		);
	});
	
	getOrientation();

	return (
		<>
			<List component="nav" aria-labelledby="nested-list-subheader" className={classes.root} >
				<ListItem button onClick={handleOpenOrientation}>
					<ListItemText primary={ orientation ? orientation : "orientation" } /> 
					{props.dropdowns.openOrientation ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={props.dropdowns.openOrientation} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{ orientationListJsx }
					</List>
				</Collapse>
			</List>
		</>
	);
}

export default OrientationDropdown;