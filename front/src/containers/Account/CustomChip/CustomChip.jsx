import React, { useState } from 'react';
import api from '../../../api/api'

import { TextField, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import './CustomChip.css'

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


function CustomChip() {
	const classes = useStyles();

	const [hobbies, setHobbies] = useState(null);
	const [hobbyList, setHobbyList] = useState([]);
	const [openHobby, setOpenHobby] = useState(false);	
	const [userHobbyList, setUserHobbyList] = useState([]);

	// HOBBIES DROPDOWN

		// Get hobbies names from back
		const getHobbies = () => {
			api.get('/user/hobby')
			.then((res) => {
				setHobbies(res.data.name);
			})
			.catch((err) => {
				console.log(err);
			})
		};	
		
		// Open the orientation dropdown
		const handleOpenHobby = () => {
			setOpenHobby(!openHobby);
			if (!hobbyList.length) {
				api.get('/hobby')
				.then((res) => {
					setHobbyList(res.data);
				})
				.catch((err) => {
					console.log(err);
				})
			}
		};

		// Post selected orientation (id) to server
		const handleChooseHobby = (name, id) => {
			let _id = {hobbies: [id]};
			api.post('/user/hobby', _id)
			.then((res) => {
				handleOpenHobby();
				// console.log(res);
			})
			.catch((err) => {
				console.log(err);
			})
			// console.log(name);
			// console.log(_id);
		};

		// Create the jsx for the orientation selection list
		const hobbyListJsx = hobbyList.map(text => {
			return (
				<ListItem button key={text._id} className={classes.nested} value={text._id} onClick={() => handleChooseHobby(text.name, text._id)} >
					<ListItemText primary={text.name} />
				</ListItem>
			);
		});

	getHobbies();

	// Handle user hobbies 
		// Get hobbies names from back 
		const getHobbyList = () => {
			api.get('/user/hobby')
			.then((res) => {
				console.log(res.data);
				setUserHobbyList(res.data);
			})
			// .then(() => {
			// 	console.log("userHobbyList");
			// 	console.log(userHobbyList);
			// })
			.catch((err) => {
				console.log(err);
			})
		};

		// Add a new hobby on server
		const [newHobbyName, setNewHobbyName] = useState(null);
		
		const createHobby = (e) => {
			setNewHobbyName(e.target.value);
			// api.post('/user/hobby', )
		}

		// // Add a hobby to user hobbies
		// const addHobby = (name, id) => {
		// 	let _id = [id];
		// 	console.log("========");
		// 	console.log(id);
		// 	console.log(_id);
		// 	api.post('/user/hobby', _id)
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	})
		// };

		// Remove a hobby from user hobbies
		const deleteUserHobby = (id, name) => {
			let _id = {_id: id};
			console.log(_id);
			console.log(_id);
			api.delete('/user/hobby', _id)
			.then((res => {
				console.log(res);
			}))
			.catch((err => {
				console.log(err);
			}))
		}

		const userHobbiesJsx = userHobbyList.map(text => {
			return (
				<Chip variant="outlined" size="small" key={text._id} label={text.name} onClick={() => deleteUserHobby(text._id)} /> 
				// onDelete={() => deleteUserHobby(text._id, text.name)}
			);
		});

	if (!userHobbyList.length)
		getHobbyList();

	return (
		<>
			<List component="nav" aria-labelledby="nested-list-subheader" className={classes.root} >
			<ListItem button onClick={handleOpenHobby}>
				<ListItemText primary={ "hobbies list" } /> 
				{openHobby ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={openHobby} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{ hobbyListJsx }
				</List>
			</Collapse>
			</List>
			<TextField variant="outlined" placeholder="add hobby" value="" name="createHobby" onChange={createHobby}/>
		</>
		// <>
		// 	{ userHobbiesJsx }
		// </>
	);
}

export default CustomChip;