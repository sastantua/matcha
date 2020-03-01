import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';

import api from '../../../api/api'
import SearchRequestContext from '../../../context/SearchRequestContext';

// import { TextField, Button, Chip } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: auto;
	margin-top: 2vh;
	background-image: linear-gradient(90deg, #FF655B 30%, #FF5864 90%);
`

const StyledList = styledMaterial(List)({
	width: '100%',
	maxWidth: 360,
	maxHeight: 300,
	overflow: 'auto',
	background: '#FF3860',
	opacity: 0.6,
	color: "#000",
})

function Hobby() {

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

	const handleChooseHobby = (id) => {
		setRequestHobbyList(requestHobbyList.concat(id));
		setRequest({
			...request, 
			// hobbies: hobbies.push(id),
		});
	};

	console.log(requestHobbyList);


	const HobbyList = () => {
		return (
			hobbyList.map(text =>
				<ListItem button key={text._id} value={text._id} onClick={() => handleChooseHobby(text._id)} >
					<ListItemText primary={text.name} />
				</ListItem>
			)
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
			{/* {!!userHobbyList.length && <UserHobbies />} */}
		</MainContainer>
	);
}

export default Hobby;