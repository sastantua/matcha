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

function Filter(props) {
	const classes = useStyles();

	const [filterList, setFilterList] = useState(["age", "proximity", "popularity", "hobby"]);
	const [openFilter, setOpenFilter] = useState(false);
	
	const handleOpenFilter = () => {setOpenFilter(!openFilter);};
	const handleChooseFilter = (name) => {props.setFilter(name);};

	const FilterList = () => {
		return (
			filterList.map(text =>
				<ListItem button key={text} value={text} onClick={() => handleChooseFilter(text)} >
					<ListItemText primary={text} />
				</ListItem>
			)
		)
	}

	return (
		<MainContainer>
			<StyledList component="nav" aria-labelledby="nested-StyledList-subheader" >
				<ListItem button onClick={handleOpenFilter}>
					<ListItemText primary={"filters"} />
					{openFilter ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openFilter} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{!!filterList.length && <FilterList />}
					</List>
				</Collapse>
			</StyledList>
		</MainContainer>
	);
}

export default Filter;