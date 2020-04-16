import React from 'react';

import styled from "styled-components";

import pinguin from '../../media/404pinguin.png';

const PinguinWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	background-color: hsl(194, 64%, 63%);;
`

const Pinguin = styled.img
`
	height: 50vh;
	width: 50vw;
`

const NoMatch = () => {
	return (
		<PinguinWrapper>
			<Pinguin src={pinguin} alt="404 img"/>
		</PinguinWrapper>
	)
}

export default NoMatch;