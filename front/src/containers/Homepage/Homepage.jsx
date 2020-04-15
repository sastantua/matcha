import React from 'react';
import styled from "styled-components"

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { colors, device } from '../../config/style'

import SimpleMap from './SimpleMap';

const HomepageSmallContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: auto;
	@media ${device.mobileS} {
		height: 82vh;
		margin-top: 10vh;
		margin-bottom: 8vh;
	}
	@media ${device.tablet} {
		height: 85vh;
		margin-top: 10vh;
		margin-bottom: 5vh;
	}
`

function Homepage() {
	return (
		<>
		<Header/>
			<HomepageSmallContainer>
				<SimpleMap/>
			</HomepageSmallContainer>
		<Footer/>
		</>
	);
}

export default Homepage;