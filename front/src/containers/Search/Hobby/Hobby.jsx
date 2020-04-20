import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';

import api from '../../../api/api'
import { COLORS } from '../../../config/style'
import SearchRequestContext from '../../../context/SearchRequestContext';

import { List, ListItem, ListItemText, Collapse, Chip } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	root: {
		background: COLORS.PURPLE_LIGHT,
		color: COLORS.PURPLE,
		borderRadius: '10px',
	},
	chip: {
		width: '100%',
		background: '#FF3860',
		color: COLORS.WHITE
	},
	field: {color: COLORS.WHITE},
}));

function Hobby() {
	const classes = useStyles();

	const [hobbyList, setHobbyList] = useState([]);
	const [requestHobbyList, setRequestHobbyList] = useState([]);
	const [openHobby, setOpenHobby] = useState(false);
	const [request, setRequest] = useContext(SearchRequestContext);
	
	useEffect(() => {
		if (!hobbyList.length)
			getHobbyList();
	})

	const handleOpenHobby = () => {
		setOpenHobby(!openHobby);
	};

	const getHobbyList = () => {
		api.get('/hobby')
		.then((res) => {
			setHobbyList(res.data);
		})
		.catch((err) => {
			console.log(err);
		})
	};

	const handleChooseHobby = (id, name) => {
		if (requestHobbyList.length === 0)
			setRequestHobbyList(requestHobbyList.concat({id, name}));
		else if (requestHobbyList.filter(cell => cell.id === id).length === 0)
			setRequestHobbyList(requestHobbyList.concat({id, name}));
		setRequest({
			...request,
			hobbies: requestHobbyList,
		});
	};

	const deleteUserHobby = (hobbyToDelete) => {
		let newRequestHobbyList = requestHobbyList.filter(hobby => hobby.id !== hobbyToDelete.id);
		setRequestHobbyList(newRequestHobbyList);
	}

	const HobbyList = () => {
		return (
			hobbyList.map(text =>
				<ListItem button key={text._id} value={text._id} onClick={() => handleChooseHobby(text._id, text.name)} >
					<ListItemText primary={text.name} />
				</ListItem>
			)
		)
	}

	const ChoosedHobbyList = () => {
		return (
			requestHobbyList.map(hobby => {
				return (
					<Chip className={classes.chip} variant="outlined" size="small" key={hobby.id} label={hobby.name} onClick={() => deleteUserHobby(hobby)} />
				)
			})
		)
	}

	return (
		<div>
			<List component="nav" aria-labelledby="nested-StyledList-subheader" className={classes.root}>
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
			{ !!requestHobbyList.length && <ChoosedHobbyList/> }
		</div>
	);
}

export default Hobby;