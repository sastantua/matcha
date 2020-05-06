import React from 'react';
import styled from "styled-components"

import { BREAK_POINTS } from '../../config/style'

import SimpleMap from './SimpleMap';

const MapContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: auto;
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		height: 82vh;
		margin-top: 10vh;
		margin-bottom: 8vh;
	}
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		height: 85vh;
		margin-top: 10vh;
		margin-bottom: 5vh;
	}
`

function Map() {
	return (
		<MapContainer>
			<SimpleMap/>
		</MapContainer>
	);
}

export default Map;