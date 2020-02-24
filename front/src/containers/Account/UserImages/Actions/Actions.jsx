import React, { useState } from 'react';

import { TextWrapper } from '../../../../components/Wrapper/Wrapper.jsx';
import { Checkbox } from '@material-ui/core';

import './Actions.css'

function Actions() {
	const [isProfilePicture, setIsProfilePicture] = useState(false);
	
	// const handleYes = (e) => {!yes && !no ? setYes(true) : setYes(false);}
	// const handleNo = (e) => {!no && !yes ? setNo(true) : setNo(false);}
	
	const handleIsProfilePicture = (e) => {
		!isProfilePicture ? setIsProfilePicture(true) : setIsProfilePicture(false);
		//api.post('/user/????').then((res) => {}).catch((err) => {})
	}

	return (
		<div id="actions-main-container">
			<div id="set-as-profile">
				<TextWrapper id="placeholder">set as profile</TextWrapper>
				<Checkbox id="checkbox" checked={isProfilePicture} onChange={handleIsProfilePicture} value="test" />
			</div>
		</div>
	);
}

export default Actions;