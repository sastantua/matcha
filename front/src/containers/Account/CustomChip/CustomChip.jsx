import React, { useState } from 'react';
import api from '../../../api/api'

import { TextField, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { Autocomplete } from '@material-ui/lab';

import './CustomChip.css'

const useStyles = makeStyles({
	root: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '0 30px',
	},
});

function CustomChip() {
	const classes = useStyles();

	const [hobbyList, setHobbyList] = useState([]);

	// Get hobbies names from back 
	const getHobbyList = () => {
		api.get('/hobby')
		.then((res) => {
			setHobbyList(res.data);
			console.log(res.data);
		})
		.then(() => {console.log("hobbyList");console.log(hobbyList);})
		.catch((err) => {
			console.log(err);
		})
	};

	// Add a new hobby on server
	const createHobby = () => {
		api.post('/user/hobby', )
	}

	
	// Add a hobby to user hobbies
	const addHobby = (name, id) => {
		let _id = {_id: id};
		api.post('/user/hobby', _id)
		.then((res) => {
			// console.log(res);
		})
		.catch((err) => {
			console.log(err);
		})
	};
	
	// Remove a hobby from user hobbies
	const deleteHobby = () => {

	}

	const userHobbiesJsx = hobbyList.map(text => {
		return (
			<Chip className="test" variant="outlined" size="small" key={text._id} label={text.name} onClick={() => addHobby(text._id)} onDelete={deleteHobby}/> 
		);
	});

	if (!hobbyList.length)
		getHobbyList();

	return (
		<div id="chip-container">
			{ userHobbiesJsx }
		</div>
	);
}

export default CustomChip;