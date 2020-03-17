import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import api from '../../../api/api'
import SearchRequestContext from '../../../context/SearchRequestContext';

import { List, ListItem, ListItemText, Collapse, Chip } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: auto;
	margin-bottom: 3vh;
	background-image: linear-gradient(90deg, #FF655B 30%, #FF5864 90%);
`

const StyledList = styledMaterial(List)({
	width: '150%',
	maxWidth: 360,
	maxHeight: 300,
	overflow: 'auto',
	background: '#FF3860',
	opacity: 0.6,
	color: "#000",
})

const useStyles = makeStyles(theme => ({
	root: {color: "#000"},
	chip: {
		width: '150%',
		background: '#FF3860',
		color: "#000",
		marginTop: '1em',
	},
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
		<MainContainer>
			<StyledList component="nav" aria-labelledby="nested-StyledList-subheader" >
				<ListItem button onClick={handleOpenHobby}>
					<ListItemText primary={"hobbies list"} />
					{openHobby ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openHobby} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{!!hobbyList.length && <HobbyList />}
					</List>
				</Collapse>
			</StyledList>
			{ !!requestHobbyList.length && <ChoosedHobbyList/> }
		</MainContainer>
	);
}

export default Hobby;