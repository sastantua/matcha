import React, { useState } from 'react';
import styled from "styled-components";

import pinguin from '../../media/404.png';
import { COLORS } from '../../config/style'

const NotFoundContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Pinguin = styled.img`
	height: 50vh;
`

const CalmDownButton = styled.button`
	color: ${COLORS.WHITE};
	background-color: ${COLORS.PINK_FLASHY};
	padding: 14px 20px;
	margin: 8px 0;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	:hover {
		transform: scale(1.20);
	}
`


const NotFound = () => {
	const [duration, setDuration] = useState(1250);
	
	let logo = document.getElementById("logo");

	var changeDuration = () => {
		let logo = document.getElementById("logo");
		duration > 50 ? setDuration(duration / 2) : setDuration(duration / 16);
		logo.animate([
			{ transform: 'rotate(0deg)' },
			{ transform: 'rotate(360deg)' }
		],
		{
			duration: duration,
			iterations: Infinity
		})
	}

	return (
		<NotFoundContainer>
			<Pinguin id="logo" src={pinguin} onClick={() => changeDuration()} alt="404 img"/>
		</NotFoundContainer>
	)
}

export default NotFound;
