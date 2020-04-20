import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components"
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../../context/UserContext';
import api from '../../../api/api'
import { COLORS, SPACING } from '../../../config/style'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
	root: {
		background: COLORS.PURPLE_LIGHT,
		color: COLORS.PURPLE,
		borderRadius: '10px',
		overflow: 'auto',},
	chip: {
		width: '100%',
		background: '#FF3860',
		color: COLORS.WHITE
	},
	field: {color: COLORS.WHITE},
}));


const StyledInput = styled.input`
	display: inline-block;
	width: 100%;
	margin-top: 2vh;
	padding: 12px 20px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
`

const StyleButton = styled.button`
	width: 100%;
	color: ${COLORS.WHITE};
	background-color: ${COLORS.PURPLE_LIGHT};
	padding: 14px 20px;
	margin-top: 2vh;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	:hover {
		transform: scale(1.05);
	}
`

const Chip = styled.div`
	display: flex;
	align-items: center;
	background-color: ${COLORS.PINK_LIGHT};
	color: white;
	padding: ${SPACING.XXS} ${SPACING.XS};
	border-radius: 32px;
	margin: ${SPACING.XXS};
	font-weight: 600;
`

const ChipsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: ${SPACING.BASE} 0;
	& > ${Chip}:first-child {
		margin-left: 0;
	}
`

const Icon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 28px;
	width: 28px;
	border-radius: 50%;
	background-color: ${COLORS.GREY};
	opacity: .7;
	box-shadow: 0px 0px 102px -20px rgba(0,0,0,0.75);
	margin-right: ${SPACING.XS};
`

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

	// console.log(user);

	const deleteUserHobby = (id) => {
		api.delete('/user/hobby', {data: {_id: id}})
		.then((res => {
			getUserHobbies();
			console.log(id);
		}))
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
				<ListItem button key={text._id} value={text._id} onClick={() => handleChooseHobby(text._id, text.name)} >
					<ListItemText primary={text.name} />
				</ListItem>
			)
		)
	}

	// const UserHobbies = () => {
	// 	return (
	// 		userHobbyList.map(text =>
	// 			<Chip  >
	// 				{text.name}
	// 			</Chip>
	// 		)
	// 	)
	// };

	return (
		<div>
			<List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
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
			<StyledInput type="text" placeholder="add hobby" value={newHobbyName} name="createHobby" onChange={handleNewHobby}/>
			<StyleButton onClick={createHobby}>Add a new hobby to the list</StyleButton>
			{/* {!!userHobbyList.length && <UserHobbies />} */}
			<ChipsContainer>
			{
				hobbyList.map(hobby =>
					<Chip onClick={() => deleteUserHobby(hobby._id)} key={hobby._id}>
						<Icon>
							<i class="fab fa-slack-hash"></i>
						</Icon>
						<span>{hobby.name}</span>
					</Chip>
				)
			}
			</ChipsContainer>
		</div>
	);
}

export default Hobby;