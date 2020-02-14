import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import api from '../../api/api'

import { TextWrapper, InputWrapper } from '../../components/Wrapper/Wrapper.jsx';
import { Button, Typography, Checkbox } from '@material-ui/core';

import useStyles from '../../helper/useStyles'

import './Account.css'

function CustomCheckbox() {
	const classes = useStyles();
	const { user, setUser } = useContext(UserContext);
	const [isMale, setIsMale] = useState(false);
	const [isFemale, setIsFemale] = useState(false);
	const [isIntoMale, setIsIntoMale] = useState(false);
	const [isIntoFemale, setIsIntoFemale] = useState(false);
	
	
	const handleSubmit = (e) => {
		e.preventDefault();
		api.post('/user/edit', user)
		.then((res) => {console.log(res);})
		.catch((err) => {console.log(err);})
	}

	const handleIsMale = (e) => {
		if (!isMale && !isFemale)
			setIsMale(true);
		else if (!isMale && isFemale)
			setIsMale(false);
		else
			setIsMale(false);
		// api.post('/user/edit', user)
	}

	const handleIsFemale = (e) => {
		if (!isFemale && !isMale)
			setIsFemale(true);
		else if (!isFemale && isMale)
			setIsFemale(false);
		else
			setIsFemale(false);
	}

	const handleIsIntoMale = (e) => {
		if (!isIntoMale && !isIntoFemale)
			setIsIntoMale(true);
		else if (!isIntoMale && isIntoFemale)
			setIsIntoMale(false);
		else
			setIsIntoMale(false);
	}

	const handleIsIntoFemale = (e) => {
		if (!isIntoFemale && !isIntoMale)
			setIsIntoFemale(true);
		else if (!isIntoFemale && isIntoMale)
			setIsIntoFemale(false);
		else
			setIsIntoFemale(false);
	}


	return (
		<div id="main-container">
			<div id="sexe">
				<Checkbox checked={isMale} onChange={handleIsMale} value="isMale" />
				<Checkbox checked={isFemale} onChange={handleIsFemale} value="isFemale" />
			</div>
			<div id="orientation">
				<Checkbox checked={isIntoMale} onChange={handleIsIntoMale} value="isIntoMale" />
				<Checkbox checked={isIntoFemale} onChange={handleIsIntoFemale} value="isIntoFemale" />
			</div>
		</div>
	);
}

export default CustomCheckbox;