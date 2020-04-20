import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import api from '../../../api/api'

import { TextField, Button, Chip } from '@material-ui/core';
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
		maxHeight: 300,
		background: '#FF3860',
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

	const { user, setUser } = useContext(UserContext);

	const [hobbyList, setHobbyList] = useState([]);
	const [userHobbyList, setUserHobbyList] = useState([]);
	const [newHobbyName, setNewHobbyName] = useState("");
	
	let hobbyArray = [];

	// HOBBIES DROPDOWN

	useEffect(() => {
		if (!hobbyList.length) getHobbyList();
		if (!userHobbyList.length) getUserHobbies();
	})

	// Get hobbies names from back 
	const getHobbyList = () => {
		api.get('/hobby')
		.then((res) => {setHobbyList(res.data);})
		.catch((err) => {console.log(err);})
	};

	// Get user hobbies from back
	const getUserHobbies = () => {
		api.get('/user/hobby')
		.then((res) => {setUserHobbyList(res.data);})
		.catch((err) => {console.log(err);})
	};

	const handleChooseHobby = (id, name) => {
		hobbyArray.push(name);
		setUser({...user, hobby: hobbyArray});
		api.post('/user/hobby', { hobbies: [id] })
		.then((res) => {
			handleOpenHobby();
			getUserHobbies();
		})
		.catch((err) => {
			console.log(err);
		})
	};

	console.log(user);

	const deleteUserHobby = (id) => {
		api.delete('/user/hobby', {data: {_id: id}})
		.then((res => {getUserHobbies();}))
		.catch((err => {console.log(err);}))
	}

	const handleNewHobby = (e) => {setNewHobbyName(e.target.value);}

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
		props.dropdowns.setOpenHobby(!props.dropdowns.openHobby);
		props.dropdowns.openGender && props.dropdowns.setOpenGender(!props.dropdowns.openGender);
		props.dropdowns.openOrientation && props.dropdowns.setOpenOrientation(!props.dropdowns.openOrientation);
	};
	
	// Create the jsx for the orientation selection list
	const HobbyList = () => {
		return (
			hobbyList.map(text =>
				<ListItem button key={text._id} className={classes.nested} value={text._id} onClick={() => handleChooseHobby(text._id, text.name)} >
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
					{props.dropdowns.openHobby ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={props.dropdowns.openHobby} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{!!hobbyList.length && <HobbyList />}
					</List>
				</Collapse>
			</List>
			<TextField className={classes.field} variant="outlined" placeholder="add hobby" value={newHobbyName} name="createHobby" onChange={handleNewHobby} />
			<Button onClick={createHobby} className={classes.root} style={{marginTop: "2vh"}}>add</Button>
			{!!userHobbyList.length && <UserHobbies />}
		</div>
	);
}

export default Hobby;