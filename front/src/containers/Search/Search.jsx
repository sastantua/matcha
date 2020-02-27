import React from 'react';
import styled from 'styled-components'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import Age from './Age/Age';
// import Hobby from './Hobby/Hobby';
import Popularity from './Popularity/Popularity';
import Localisation from './Localisation/Localisation';
// import Test from './Test';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: auto;
	height: 180vh;
	margin-top: 6vh;
	margin-bottom: 8vh;
	background-image: linear-gradient(90deg, #FF655B 30%, #FF5864 90%);
`

function Search() {
	// const { user, setUser } = useContext(UserContext);
	
	return (
		<div id="search-small">
			<Header />
				<MainContainer>
					<Age/>
					{/* <Hobby/> */}
					<Popularity/>
					<Localisation/>
					{/* <Test/> */}
				</MainContainer>
			<Footer />
		</div>
	);
}

export default Search;