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
	background-image: linear-gradient(315deg, #3f0d12 0%, #a71d31 74%);
`

function LoadingPage() {

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

export default LoadingPage;