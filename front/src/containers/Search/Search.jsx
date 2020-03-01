import React, { useState } from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core'

import api from '../../api/api'
import SearchRequestContext from '../../context/SearchRequestContext';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import Age from './Age/Age';
import Hobby from './Hobby/Hobby';
import Popularity from './Popularity/Popularity';
import Distance from './Distance/Distance';

// import Test from './Test';

import { Button } from '@material-ui/core';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: auto;
	height: 120vh;
	margin-top: 6vh;
	margin-bottom: 8vh;
	background-image: linear-gradient(90deg, #FF655B 30%, #FF5864 90%);
`

const TextWrapper = styledMaterial(Typography)({
	fontSize: '1.5rem',
	color: "#FFF",
	marginBottom: '4vh',
});

function Search() {
	// const { user, setUser } = useContext(UserContext);
	const [request, setRequest] = useState({});
	
	
	const handleSubmit = () => {
		api.post('/search/', request)
		.then((res) => {
			// handleOpenHobby();
		})
		.catch((err) => {
			console.log(err);
		})
	}

	console.log(request);



	return (
		<div id="search-small">
			<Header />
				<MainContainer>
					<TextWrapper>Search users from our base</TextWrapper>
					<SearchRequestContext.Provider value={[request, setRequest]}>
						<Distance/>
						<Age/>
						<Popularity/>
						<Hobby/>
						<Button onClick={handleSubmit}>Search</Button>
						{/* <Test/> */}
					</SearchRequestContext.Provider>
				</MainContainer>
			<Footer />
		</div>
	);
}

export default Search;