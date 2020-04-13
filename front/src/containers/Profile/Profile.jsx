import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';

import { Typography, Paper } from '@material-ui/core';
import { Favorite as FavoriteIcon, Cancel as CancelIcon, Block as BlockIcon, Replay as ReplayIcon } from '@material-ui/icons';

import api from '../../api/api'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import findAge from './Helper/findAge';
import UserPictures from './UserPictures/UserPictures';

const UserContainer = styled.div`
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
	backgroundColor: '#ff3860',
	paddingTop: '0.5em',
	paddingLeft: '0.5em',
	paddingRight: '0.5em',
	paddingBottom: '0.5em',
	maxWidth: '70vw',
});

const InfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
`

const Username = styledMaterial(Typography)({
	fontSize: '1rem',
	color: "#FFF",
	marginTop: '2vh',
});

const Name = styledMaterial(Typography)({
	fontSize: '1rem',
	color: "#FFF",
	marginTop: '2vh',
});

const Info = styledMaterial(Typography)({
	fontSize: '0.7rem',
	color: "#FFF",
});

const Hobbies = styledMaterial(Typography)({
	fontSize: '0.7rem',
	color: "#FFF",
	marginBottom: '1vh',
});

const Biography = styledMaterial(Typography)({
	fontSize: '0.5rem',
	color: "#FFF",
	marginBottom: '1vh',
});

const ActionContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 1.5em;
	margin-bottom: 1em;
`

function Profile(props) {
	const user = props.history.location.state.user;
	const [like, setLike] = useState(false);
	const [block, setBlock] = useState(false);
	const age = findAge(user.birthdate);
	let hobbiesArray = [];

	const likeMatch = () => {
		api.post(`/user/like/${user._id}`)
		.then((res) => {setLike(true)})
		.catch((err) => {console.log(err)})
	}

	const unlikeMatch = () => {
		api.post(`/user/unlike/${user._id}`)
		.then((res) => {setLike(false)})
		.catch((err) => {console.log(err)})
	}

	const blockMatch = () => {
		api.post(`/user/block/${user._id}`)
		.then((res) => {setBlock(true)})
		.catch((err) => {console.log(err)})
	}

	const unblockMatch = () => {
		api.post(`/user/unblock/${user._id}`)
		.then((res) => {setBlock(false)})
		.catch((err) => {console.log(err)})
	}

	if (user.hobbies.length <= 5)
		hobbiesArray = user.hobbies;
	else
		hobbiesArray = user.hobbies.splice(5, user.hobbies.length);
	
	const userHobbies = hobbiesArray.map((hobby, index) => {
		if (index < hobbiesArray.length1)
			return ("#" + hobby.name + "")
		else
			return ("#" + hobby.name)
	})

	console.log(user);

	return (
		<>
			<Header/>
				<UserContainer>
					<PaperContainer component="div">
						<UserPictures pictures={user.pictures}/>
						{/* <Username>@{props.user.username}</Username> */}
						<Name>{user.firstname} {user.lastname}</Name>
						<InfoContainer>
							<Info>{user.gender.name.charAt(0).toUpperCase() + user.gender.name.slice(1)}</Info>
							<Info style={{marginLeft: '2vw'}}>{findAge(user.birthdate)} years old</Info>
							<Info style={{marginLeft: '2vw'}}>{user.orientation.name}</Info>
						</InfoContainer>
						<Hobbies>Interested in {userHobbies}</Hobbies>
						<Biography>{user.biography}</Biography>
						<ActionContainer>
							{ like === false ? <FavoriteIcon onClick={likeMatch} htmlColor='#FAE3D9' /> : <CancelIcon onClick={unlikeMatch} htmlColor='#FAE3D9' />}
							{ block == false ? <BlockIcon onClick={blockMatch} style={{marginLeft: "1.5em"}}></BlockIcon> : <ReplayIcon onClick={unblockMatch} style={{marginLeft: "1.5em"}}></ReplayIcon>}
						</ActionContainer>
					</PaperContainer>
				</UserContainer>
			<Footer />
		</>
	);
}

export default Profile;