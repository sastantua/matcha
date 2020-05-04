import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

import api from '../../../api/api'
import { COLORS, BREAK_POINTS, SPACING } from '../../../config/style'
import SearchRequestContext from '../../../context/SearchRequestContext';

import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	root: {
		background: COLORS.PURPLE_LIGHT,
		color: COLORS.PURPLE,
		borderRadius: '10px',
		marginTop: '2vh',
	},
}));

const ChipsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: ${SPACING.BASE} 0;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: row;
		margin: ${SPACING.XS} 0;
	}
`

const Chip = styled.div`
	display: flex;
	align-items: center;
	color: white;
	background-color: ${COLORS.PURPLE};
	margin: ${SPACING.XXS};
	padding: ${SPACING.XXS} ${SPACING.XXS};
	font-weight: 300;
	border-radius: 32px;
`

const Icon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: ${COLORS.PINK_FLASHY};
	opacity: .7;
	box-shadow: 0px 0px 102px -20px rgba(0,0,0,0.75);
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		&& {
			height: 12px;
			width: 12px;
		}
		margin-right: ${SPACING.XXS};
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		&& {
			height: 28px;
			width: 28px;
		}
		margin-right: ${SPACING.XS};
	}
`

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
			<ChipsContainer>
				{
					requestHobbyList.map((hobby, index) => {
						return (
							<Chip key={index} onClick={() => deleteUserHobby(hobby)}>
								<Icon className="fab fa-slack-hash">
								</Icon>
								<span>{hobby.name}</span>
							</Chip>
						)
					})
				}
			</ChipsContainer>
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