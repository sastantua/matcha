import React from 'react';
import styled from "styled-components";
import { styled as styledMaterial } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const LoaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: auto;
	height: 88vh;
	margin-top: 6vh;
	margin-bottom: 6vh;
	background-image: linear-gradient(90deg, #FF655B 30%, #FF5864 90%);
`

function Loader() {

	return (
		<>
		<Header />
			<LoaderContainer>
				<CircularProgress style={{color: "#FFF"}}/>
			</LoaderContainer>
		<Footer />
		</>
	);
}

export default Loader;