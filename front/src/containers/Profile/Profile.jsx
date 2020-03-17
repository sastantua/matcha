import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';

import { Typography, Paper } from '@material-ui/core';

import api from '../../api/api'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import findAge from './Helper/findAge';
import UserPictures from './UserPictures/UserPictures';

const MainContainer = styled.div`
	display: flex;
	flex: auto;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: auto;
	min-height: 88vh;
	margin-top: 10vh;
	margin-bottom: 8vh;
	background-image: linear-gradient(90deg, #FF655B 30%, #FF5864 90%);
`

const PaperContainer = styled(Paper)({
	display: 'flex',
	flexDirection: 'column',
	// justifyContent: 'center',
	// alignItems: 'center',
	backgroundColor: '#ff3860',
	paddingTop: '0.5em',
	paddingLeft: '0.5em',
	paddingRight: '0.5em',
	paddingBottom: '0.5em',
	minWidth: '50vw',
	maxWidth: '70vw',
});

const HobbyContainer = styled.div`

`

const TextWrapper = styledMaterial(Typography)({
	fontSize: '1.5rem',
	color: "#FFF",
	marginTop: '2vh',
	marginBottom: '1vh',
});

const SmallTextWrapper = styledMaterial(Typography)({
	fontSize: '0.5rem',
	color: "#FFF",
	marginTop: '1vh',
});


function Profile(props) {

	const user = props.history.location.state.user;
	const age = findAge(user.birthdate);

	console.log(user);

	return (
		<>
			<Header/>
				<MainContainer>
					<UserPictures pictures={user.pictures}/>
					{/* <PaperContainer component="div">
						<TextWrapper>{user.firstname}{age}</TextWrapper>
						<HobbyContainer>
							{
								user.hobbies.map((hobby, index) =>
									<SmallTextWrapper key={index}>{hobby.name}</SmallTextWrapper>
								)
							}
						</HobbyContainer>
					</PaperContainer> */}
				</MainContainer>
			<Footer />
		</>
	);
}

export default Profile;