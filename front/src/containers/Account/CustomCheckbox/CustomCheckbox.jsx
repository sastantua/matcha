import React, { useState } from 'react';

import { TextWrapper } from '../../../components/Wrapper/Wrapper.jsx';
import { Checkbox } from '@material-ui/core';

import './CustomCheckbox.css'

function CustomCheckbox() {
	const [yes, setYes] = useState(false);
	const [no, setNo] = useState(false);
	
	const handleYes = (e) => {!yes && !no ? setYes(true) : setYes(false);}
	const handleNo = (e) => {!no && !yes ? setNo(true) : setNo(false);}

	return (
		<div id="main-container">
			<TextWrapper id="placeholder">Do you like cookies?</TextWrapper>
			<div id="yes">
				<TextWrapper id="placeholder">Yes</TextWrapper>
				<Checkbox id="checkbox" checked={yes} onChange={handleYes} value="test" />
			</div>
			<div id="no">
				<TextWrapper id="placeholder">No</TextWrapper>
				<Checkbox id="checkbox" checked={no} onChange={handleNo} value="test" />
			</div>
		</div>
	);
}

export default CustomCheckbox;