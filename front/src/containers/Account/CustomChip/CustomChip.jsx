import React from 'react';
import { Chip } from '@material-ui/core';

import './CustomChip.css'

function CustomChip() {
	return (
		<div id="chip-container">
			<Chip variant="outlined" size="small" label="trial"/> 
			<Chip variant="outlined" size="small" label="bitcoin"/> 
			<Chip variant="outlined" size="small" label="sea of thieves"/> 
			<Chip variant="outlined" size="small" label="ptit cul"/> 
			{/* onDelete={handleDelete} */}
		</div>
	);
}

export default CustomChip;

