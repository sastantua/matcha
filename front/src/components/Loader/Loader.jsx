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
	height: 100vh;
	width: 100%;
`

function Loader() {

	return (
		<LoaderContainer>
			<CircularProgress style={{color: "#FFF"}}/>
		</LoaderContainer>
	);
}

export default Loader;