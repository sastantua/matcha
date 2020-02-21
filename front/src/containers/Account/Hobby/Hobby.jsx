import React, { useState, useEffect, useContext } from 'react';
import { StateFunctionContext } from '../../../context/UserContext';
import api from '../../../api/api'

import { TextField, Button, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import './Hobby.css'

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
	field: {
		width: '100%',
		color: "#000",
		marginTop: '1em',
	},
	chip: {
		width: '100%',
		background: '#FF3860',
		color: "#000",
		marginTop: '1em',
	},
}));


function Hobby(props) {
	const classes = useStyles();

	const [hobbyList, setHobbyList] = useState([]);
	const [userHobbyList, setUserHobbyList] = useState([]);
	const [newHobbyName, setNewHobbyName] = useState(null);
	
	// HOBBIES DROPDOWN

	useEffect(() => {
		if (!hobbyList.length) getHobbyList();
		if (!userHobbyList.length) getUserHobbies();
	})

	// Get hobbies names from back 
	const getHobbyList = () => {
		api.get('/hobby')
			.then((res) => {
				// console.log(res.data);
				setHobbyList(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
	};

	// Get user hobbies from back
	const getUserHobbies = () => {
		api.get('/user/hobby')
			.then((res) => {
				console.log(res.data);
				setUserHobbyList(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
	};

	const handleChooseHobby = (id) => {
		api.post('/user/hobby', { hobbies: [id] })
			.then((res) => {
				handleOpenHobby();
				getUserHobbies();
			})
			.catch((err) => {
				console.log(err);
			})
	};

	const deleteUserHobby = (id) => {
		api.delete('/user/hobby', {data: {_id: id}})
			.then((res => {
				console.log(res);
				getUserHobbies();
			}))
			.catch((err => {
				console.log(err);
			}))
	}

	const handleNewHobby = (e) => {
		setNewHobbyName(e.target.value);
	}

	const createHobby = () => {
		api.post('/hobby', {name: newHobbyName})
			.then((res => {
				getHobbyList();
				console.log(res);
			}))
			.catch((err => {
				console.log(err);
			}))
	}

	// Open the orientation dropdown
	const handleOpenHobby = () => {
		props.dropdowns.soh(!props.dropdowns.oh);
	};
	
	// Create the jsx for the orientation selection list
	const HobbyList = () => {
		return (
			hobbyList.map(text =>
				<ListItem button key={text._id} className={classes.nested} value={text._id} onClick={() => handleChooseHobby(text._id)} >
					<ListItemText primary={text.name} />
				</ListItem>
			)
		)
	}

	const UserHobbies = () => {
		return (
			userHobbyList.map(text =>
				<Chip className={classes.chip} variant="outlined" size="small" key={text._id} label={text.name} onClick={() => deleteUserHobby(text._id)} />
			)
		)
	};

	return (
		<div>
			<List component="nav" aria-labelledby="nested-list-subheader" className={classes.root} >
				<ListItem button onClick={handleOpenHobby}>
					<ListItemText primary={"hobbies list"} />
					{props.dropdowns.oh ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={props.dropdowns.oh} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{hobbyList.length && <HobbyList />}
					</List>
				</Collapse>
			</List>
			<TextField className={classes.field} variant="outlined" placeholder="add hobby" value={newHobbyName} name="createHobby" onChange={handleNewHobby} />
			<Button onClick={createHobby} className={classes.root}>add</Button>
			{userHobbyList.length && <UserHobbies />}
		</div>
	);
}

export default Hobby;