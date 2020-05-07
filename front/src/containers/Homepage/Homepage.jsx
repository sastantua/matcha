import React from 'react';
import styled from "styled-components";

import { COLORS, BREAK_POINTS, SPACING } from '../../config/style';
import Love from '../../media/lovegif1.gif';

const HomepageContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100%;
	width: 100%;
	& > * {
		@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
			padding: ${SPACING.LG};
		}
		@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
			padding: ${SPACING.BASE};
		}
	}
`

const Title = styled.span`
	color: ${COLORS.WHITE};
	margin-top: auto;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 600;
		font-size: 1.5rem;
		width: auto;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 400;
		font-size: 2rem;
	}
`

const ImageBlockContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: auto;
`


const StyledImage = styled.img`
	& > * {
		padding: ${SPACING.XS};
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		height: 50vh;
		width: auto;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		height: auto;
		width: 100%;
	}
`

const Text = styled.span`
	color: ${COLORS.WHITE};
	font-family: Outbreak;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 300;
		font-size: 2rem;
		width: auto;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 250;
		font-size: 1.5rem;
	}
`

const RedirectionsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
	margin-top: auto;
`

const RedirectionButton = styled.button`
	color: ${COLORS.WHITE};
	background-image: linear-gradient(90deg, ${COLORS.ORANGE_GRADIENT} 30%, ${COLORS.PINK_GRADIENT} 90%);
	padding: ${SPACING.XS};
	margin: 0 ${SPACING.LG};
	border: none;
	border-radius: 4px;
	width: 10%;
	cursor: pointer;
	:hover {
		transform: scale(1.10);
	}
`


function Homepage() {
	return (
		<HomepageContainer>
			<Title>Matcha</Title>
			<ImageBlockContainer>
				<StyledImage src={Love} alt=""/>
				<Text>Because love is going remote</Text>
			</ImageBlockContainer>
			<RedirectionsContainer>
				<RedirectionButton>Login</RedirectionButton>
				<RedirectionButton>Signup</RedirectionButton>
			</RedirectionsContainer>
		</HomepageContainer>
	);
}

export default Homepage;