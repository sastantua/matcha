import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

import api from '../../api/api'
import findAge from '../../helper/findAge';
import UserPictures from '../../helper/UserImages/UserImages';
import { COLORS, SPACING, BREAK_POINTS } from '../../config/style';

// import { styled as styledMaterial } from '@material-ui/core/styles';
// import { Typography, Paper } from '@material-ui/core';
// import { Favorite as FavoriteIcon, Cancel as CancelIcon, Block as BlockIcon, Replay as ReplayIcon } from '@material-ui/icons';


const ProfileContainer = styled.div`
 	display: flex;
 	flex-direction: column;
 	align-items: center;
 	width: auto;
	margin-top: 10vh;
`

const UserPicturesContainer = styled.div`
	height: auto;
	width: auto;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		min-height: 15vh;
		min-width: 15vw;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		min-height: 30vh;
		min-width: 30vw;
	}
`

const Text = styled.span`
	color: ${COLORS.BLACK};
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 600;
		font-size: 1.3em;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 400;
		font-size: 0.8em;
	}
`

const InfoContainer = styled.div`

`

const HobbyContainer = styled.div`

`

const BiographyContainer = styled.div`

`

const ActionContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	/* margin-top: 1.5em; */
	/* margin-bottom: 1em; */
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
		<ProfileContainer>
			<UserPicturesContainer>
				<UserPictures pictures={user.pictures}/>
			</UserPicturesContainer>
			<InfoContainer>

			</InfoContainer>
			
			<HobbyContainer>

			</HobbyContainer>
			
			<BiographyContainer>

			</BiographyContainer>
			
			<ActionContainer>

			</ActionContainer>

			{/* <Username>@{user.username}</Username>
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
				{ block === false ? <BlockIcon onClick={blockMatch} style={{marginLeft: "1.5em"}}></BlockIcon> : <ReplayIcon onClick={unblockMatch} style={{marginLeft: "1.5em"}}></ReplayIcon>}
			</ActionContainer> */}
		</ProfileContainer>
	);
}

export default Profile;