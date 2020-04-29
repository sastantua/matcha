import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { COLORS } from '../../../config/style'

import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	root: {
		background: COLORS.PURPLE_LIGHT,
		color: COLORS.PURPLE,
		borderRadius: '10px',
		marginTop: '2vh',
	},
	chip: {
		width: '100%',
		background: '#FF3860',
		color: COLORS.WHITE
	},
	field: {color: COLORS.WHITE},
}));

function SortBy(props) {
	const classes = useStyles();

	const [openSort, setOpenSort] = useState(false);
	const [updatedSort, setUpdatedSort] = useState(props.sort);
	
	const sortList = ["age", "proximity", "popularity", "hobby"];

	const handleOpenSort = () => {
		setOpenSort(!openSort)
	};
	
	const handleChooseSort = (name) => {
		props.setSort(name)
		setUpdatedSort(name);
	};

	const SortList = () => {
		return (
			sortList.map(text =>
				<ListItem button key={text} value={text} onClick={() => handleChooseSort(text)} >
					<ListItemText primary={text} />
				</ListItem>
			)
		)
	}

	return (
		<div>
			<List component="nav" aria-labelledby="nested-StyledList-subheader" className={classes.root}>
				<ListItem button onClick={handleOpenSort}>
					<ListItemText primary={updatedSort === undefined ? "Sort by ..." : `Sort by ${updatedSort}`} />
					{openSort ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openSort} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{!!sortList.length && <SortList />}
					</List>
				</Collapse>
			</List>
		</div>
	);
}

export default SortBy;