import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import api from '../../api/api'

import { TextWrapper } from '../../components/Wrapper/Wrapper.jsx';
import { Checkbox } from '@material-ui/core';

import './CustomCheckbox.css'

function CustomCheckbox() {
	const { user, setUser } = useContext(UserContext);
	const [yes, setYes] = useState(false);
	const [no, setNo] = useState(false);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		api.post('/user/edit', user)
		.then((res) => {console.log(res);})
		.catch((err) => {console.log(err);})
	}

	const handleYes = (e) => {
		if (!yes && !no)
			setYes(true);
		else if (!yes && no)
			setYes(false);
		else
			setYes(false);
		// api.post('/user/edit', user)
	}

	const handleNo = (e) => {
		if (!no && !yes)
			setNo(true);
		else if (!no && yes)
			setNo(false);
		else
			setNo(false);
	}
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