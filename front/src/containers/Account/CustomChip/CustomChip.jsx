import React, { useState } from 'react';
import api from '../../../api/api'

import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
		api.get('/user/hobby')
		.then((res) => {
			// console.log("before");
			// console.log(hobbyList);
			setHobbyList(res.data.name);
			// console.log("after	");
			// console.log(hobbyList);
		})
		.catch((err) => {
			console.log(err);
		})
	};

	const selectHobby = (name, id) => {
		let _id = {_id: id};
		api.post('/user/hobby', _id)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		})
		console.log(name);
		console.log(id);
	};


	const hobbyListJsx = hobbyList.map(text => {
		return (
			<Chip className="test" variant="outlined" size="small" label="trial" onClick={selectHobby}/> 
		);
	});

	// getHobbyList();

	// const addHobby = () => {
	// 	api.post('/user/hobby', )
	// }

	// addHobby();
	// const deleteHobby

	return (
		<div id="chip-container">
			{/* { hobbyListJsx } */}
			<Chip className="test" variant="outlined" size="small" label="bitcoin"/> 
			<Chip className="test" variant="outlined" size="small" label="link"/> 
			<Chip className="test" variant="outlined" size="small" label="link"/> 
			<Chip className="test" variant="outlined" size="small" label="link"/> 
			<Chip className="test" variant="outlined" size="small" label="link"/> 
			<Chip className="test" variant="outlined" size="small" label="link"/> 
			<Chip className="test" variant="outlined" size="small" label="link"/> 
			<Chip className="test" variant="outlined" size="small" label="link"/> 
			<Chip className="test" variant="outlined" size="small" label="link"/> 
			<Chip className="test" variant="outlined" size="small" label="link"/> 
			<Chip className="test" variant="outlined" size="small" label="link"/> 
			<Chip className="test" variant="outlined" size="small" label="link"/> 
			<Chip className="test" variant="outlined" size="small" label="link"/> 
			<Chip className="test" variant="outlined" size="small" label="link"/>
			{/* onDelete={handleDelete} */}
		</div>
	);
}

export default CustomChip;