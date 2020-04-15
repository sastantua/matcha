import React, { useState } from 'react';
import styled from "styled-components";

import { TextWrapper } from '../../../../components/Wrapper/Wrapper.jsx';
import { Checkbox } from '@material-ui/core';

const ActionContainer = styled.div`
	display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const ActionSubContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

function Actions() {
	const [isProfilePicture, setIsProfilePicture] = useState(false);
	
	// const handleYes = (e) => {!yes && !no ? setYes(true) : setYes(false);}
	// const handleNo = (e) => {!no && !yes ? setNo(true) : setNo(false);}
	
	const handleIsProfilePicture = (e) => {
		!isProfilePicture ? setIsProfilePicture(true) : setIsProfilePicture(false);
		//api.post('/user/????').then((res) => {}).catch((err) => {})
	}

	return (
		<ActionContainer>
			<ActionSubContainer>
				<TextWrapper id="placeholder">set as profile</TextWrapper>
				<Checkbox id="checkbox" checked={isProfilePicture} onChange={handleIsProfilePicture} value="test" />
			</ActionSubContainer>
		</ActionContainer>
	);
}

export default Actions;