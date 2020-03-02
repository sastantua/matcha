import React, { useState } from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';

import api from '../../api/api'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


const MainContainer = styled.div`
	display: flex;
	flex: auto;
	flex-direction: column;
	align-items: center;
	width: auto;
	min-height: 88vh;
	margin-top: 10vh;
	margin-bottom: 8vh;
	background-image: linear-gradient(90deg, #FF655B 30%, #FF5864 90%);
`

// const TextWrapper = styledMaterial(Typography)({
// 	fontSize: '0.5rem',
// 	color: "#FFF",
// 	marginTop: '2vh',
// 	marginBottom: '1vh',
// });

// const SmallTextWrapper = styledMaterial(Typography)({
// 	fontSize: '0.5rem',
// 	color: "#FFF",
// 	marginTop: '1vh',
// });

function Profile(props) {
	// const userHobbies = props.user.hobbies.slice(0, 2);

	return (
		<>
			<Header />
				<MainContainer>
				{/* <TextWrapper>{props.user.username}</TextWrapper>
				{
					userHobbies.map(hobby =>
						<SmallTextWrapper>{hobby.name}</SmallTextWrapper>
					)
				} */}

				</MainContainer>
			<Footer />
		</>
	);
}

export default Profile;