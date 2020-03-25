import React from 'react';
import styled from "styled-components"
import { styled as styledMaterial } from '@material-ui/core/styles';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { Typography } from '@material-ui/core';

import logo from '../../media/frogs.jpg';
import SimpleMap from './SimpleMap';
import './Homepage.css';

const HomepageSmallContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: auto;
	height: 88vh;
	margin-top: 7vh;
	margin-bottom: 6vh;
	background-image: linear-gradient(90deg, #FF655B 30%, #FF5864 90%);
`

const SubContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Title = styled(Typography)({
	color: "#FFF",
	fontSize: '25px',
});

function Homepage() {
	let windowWidth = window.innerWidth;
	if (windowWidth >= 1024) {
		return (
			<div id="homepage-large">
				<Header/>
					<div id="homepage-main-container">
						<h1>Matcha</h1>
						<p>Protect yourself</p>
						<img src={logo} alt="funnypic"/>
					</div>
				<Footer/>
			</div>
		);
	}
	else if (windowWidth >= 720) {
		return (
			<div id="homepage-medium">
				<Header/>
					<div id="homepage-main-container">
						<h1>Matcha</h1>
						<p>Protect yourself</p>
						<img src={logo} alt="funnypic"/>
					</div>
				<Footer/>
			</div>
		);
	
	}
	else {
		return (
			<>
			<Header/>
				<HomepageSmallContainer>
				<SimpleMap/>
				{/* <SubContainer> */}
					{/* <Title>Matcha</Title> */}
					{/* <p>Protect yourself</p> */}
					{/* <img src={logo} alt="funnypic"/> */}
					{/* <SimpleMap/> */}
				{/* </SubContainer> */}
				</HomepageSmallContainer>
			<Footer/>
			</>
		);
	}
}

export default Homepage;