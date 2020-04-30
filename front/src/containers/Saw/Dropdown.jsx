import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import api from '../../api/api'
import { COLORS, BREAK_POINTS } from '../../config/style'

import { makeStyles } from '@material-ui/core/styles';
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
		width: '100%',
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const DropdownContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const Text = styled.span`
	color: ${COLORS.WHITE};
	width: 50%;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 600;
		font-size: 1.3em;
		width: auto;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 400;
		font-size: 0.8em;
	}
`

function Dropdown(props) {
	
	const classes = useStyles();
	const [isOpen, setIsOpen] = useState(false);
	const [dropdownList, setDropdownList] = useState([]);
	const [dropdownTitle, setDropdownTitle] = useState("show people that have");
	
	useEffect(() => {
		setDropdownList([{name: "liked you", _id: "1"}, {name: "visited your profile", _id: "2"}, {name: "liked and visited your profile", _id: "3"}]);
	}, [])
	
	const handleOpenDropdown = () => {isOpen === true ? setIsOpen(false) : setIsOpen(true);};
	
	const handleUserSelection = (name, id) => {
		setDropdownTitle(name);
		props.setUserChoice(id);
	}

	const dropdownListJsx = dropdownList.map(text => {
		return (
			<ListItem button key={text._id} className={classes.nested} value={text._id} onClick={() => handleUserSelection(text.name, text._id)}>
				<ListItemText primary={text.name} />
			</ListItem>
		);
	});
	
	return (
		<MainContainer>
			<DropdownContainer>
				<List component="nav" aria-labelledby="nested-list-subheader" className={classes.root} onClick={handleOpenDropdown}>
					<ListItem button>
						<ListItemText primary={dropdownTitle}/> 
						{isOpen ? <ExpandLess/> : <ExpandMore/>}
					</ListItem>
					<Collapse in={isOpen} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{dropdownListJsx}
						</List>
					</Collapse>
				</List>
			</DropdownContainer>
		</MainContainer>
	);
}

export default Dropdown;