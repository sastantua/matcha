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
		// backgroundColor: "rgba(255, 56, 96, 0.1)",
		color: "#000",
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

function CustomNestedList() {
	const classes = useStyles();
	
	const [gender, setGender] = useState(null);
	const [orientation, setOrientation] = useState(null);
    const [genderList, setGenderList] = useState([]);
	const [orientationList, setOrientationList] = useState([]);
	const [openGender, setOpenGender] = useState(false);
	const [openOrientation, setOpenOrientation] = useState(false);	

	// SEX IDENTIFICATION

		// Get gender names from back 
		const getGender = () => {
			api.get('/user/gender')
			.then((res) => {
				setGender(res.data.name);
			})
			.catch((err) => {
				console.log(err);
			})
		};

		// Open the gender dropdown
		const handleOpenGender = () => {
			setOpenGender(!openGender);
			if (!genderList.length) {
				api.get('/gender')
				.then((res) => {
					setGenderList(res.data);
				})
				.catch((err) => {
					console.log(err);
				})
			}
		};

		// Post selected gender (id) to server
		const handleChooseGender = (name, id) => {
			let _id = {_id: id};
			api.post('/user/gender', _id)
			.then((res) => {
				handleOpenGender();
			})
			.catch((err) => {
				console.log(err);
			})
		};

		// Create the jsx for the gender selection list
		const genderListJsx = genderList.map(text => {
			return (
				<ListItem button key={text._id} className={classes.nested} value={text._id} onClick={() => handleChooseGender(text.name, text._id)} >
					<ListItemText primary={text.name} />
				</ListItem>
			);
		});

	// SEXUAL ORIENTATION

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
			setOpenOrientation(!openOrientation);
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
	
	getGender();
	getOrientation();

	return (
		<>
		<List component="nav" aria-labelledby="nested-list-subheader" className={classes.root} >
			<ListItem button onClick={handleOpenGender}>
				<ListItemText primary={ gender ? gender : "gender" } />
				{openGender ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={openGender} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{ genderListJsx }
				</List>
			</Collapse>
		</List>
		<List component="nav" aria-labelledby="nested-list-subheader" className={classes.root} >
			<ListItem button onClick={handleOpenOrientation}>
				<ListItemText primary={ orientation ? orientation : "orientation" } /> 
				{openOrientation ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={openOrientation} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{ orientationListJsx }
				</List>
			</Collapse>
		</List>
		</>
	);
}

export default CustomNestedList;