import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

import api from '../../../api/api'

import { TextField, Button, Chip } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

function Hobby() {

	const [hobbyList, setHobbyList] = useState([]);
	const [userHobbyList, setUserHobbyList] = useState([]);
	const [newHobbyName, setNewHobbyName] = useState("");
	const [openHobby, setOpenHobby] = useState(false);
	
	useEffect(() => {
		if (!hobbyList.length) getHobbyList();
		if (!userHobbyList.length) getUserHobbies();
	})

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

	const getUserHobbies = () => {
		api.get('/user/hobby')
		.then((res) => {
			// console.log(res.data);
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

	const handleOpenHobby = () => {setOpenHobby(!openHobby);};
	
	const HobbyList = () => {
		return (
			hobbyList.map(text =>
				<ListItem button key={text._id} value={text._id} onClick={() => handleChooseHobby(text._id)} >
					<ListItemText primary={text.name} />
				</ListItem>
			)
		)
	}

	const UserHobbies = () => {
		return (
			userHobbyList.map(text =>
				<Chip variant="outlined" size="small" key={text._id} label={text.name} onClick={() => deleteUserHobby(text._id)} />
			)
		)
	};

	return (
		<div>
			<List component="nav" aria-labelledby="nested-list-subheader" >
				<ListItem button onClick={handleOpenHobby}>
					<ListItemText primary={"hobbies list"} />
					{openHobby ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openHobby} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{!!hobbyList.length && <HobbyList />}
					</List>
				</Collapse>
			</List>
			<TextField variant="outlined" placeholder="add hobby" value={newHobbyName} name="createHobby" onChange={handleNewHobby} />
			<Button onClick={createHobby}>add</Button>
			{!!userHobbyList.length && <UserHobbies />}
		</div>
	);
}

export default Hobby;