import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { COLORS } from '../../config/style'

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

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