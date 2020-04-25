import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

import api from '../../api/api'
import findAge from '../../helper/findAge';
import UserPictures from '../../helper/UserImages/UserImages';
import { COLORS, SPACING, BREAK_POINTS } from '../../config/style';

import { Block, Replay } from '@material-ui/icons';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

const ProfileContainer = styled.div`
 	display: flex;
 	flex-direction: column;
 	justify-content: center;
 	align-items: center;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		max-width: 50vw;
		& > * {
			padding: ${SPACING.XS};
		}
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		max-width: 80vw;
		& > * {
			padding: ${SPACING.XXS};
		}
	}
`

const UserPicturesContainer = styled.div`
	height: auto;
	width: auto;
	margin-top: 10vh;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		min-width: 15vw;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		min-width: 30vw;
	}
`

const InfoContainer = styled.div`
 	display: flex;
 	flex-direction: column;
 	justify-content: center;
 	align-items: center;
`

const InfoRowContainer = styled.div`
 	display: flex;
 	flex-direction: row;
 	justify-content: center;
 	align-items: center;
	& > :nth-child(n+1) {
		margin-left: ${SPACING.XS};
	}
`

const InfoText = styled.span`
	color: ${COLORS.WHITE};
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 600;
		font-size: 2em;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 300;
		font-size: 0.8em;
	}
`

const HobbyContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`

const Chip = styled.div`
	display: flex;
	align-items: center;
	color: white;
	background-color: ${COLORS.PURPLE};
	margin: ${SPACING.XXS};
	padding: ${SPACING.XXS} ${SPACING.XXS};
	font-size: 0.5em;
	font-weight: 300;
	border-radius: 32px;
`

const Icon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: ${COLORS.PINK_FLASHY};
	opacity: .7;
	box-shadow: 0px 0px 102px -20px rgba(0,0,0,0.75);
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		height: 12px;
		width: 12px;
		margin-right: ${SPACING.XXS};
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		height: 28px;
		width: 28px;
		margin-right: ${SPACING.XS};
	}
`


const BiographyContainer = styled.div`
	display: flex;
	justify-content: stretch;
	min-height: 50px;
	padding: ${SPACING.XXS} ${SPACING.XXS};
	border-radius: 15px;
	background-color: ${COLORS.GREY_LIGHT};
`

const BiographyText = styled.span`
	color: ${COLORS.BLACK};
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 600;
		font-size: 1.3em;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 300;
		font-size: 0.8em;
	}
`

const ActionContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		margin-top: ${SPACING.MD};
		transform: scale(2);
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		margin-top: ${SPACING.XS};
		transform: scale(1.1);
	}
	& > :nth-child(n+1) {
		margin-left: ${SPACING.XS}
	}
`

function Profile(props) {

	const [like, setLike] = useState(false);
	const [block, setBlock] = useState(false);

	if (props.history.location.state === undefined) {
		return (
			<div></div>
		);
	}

	const user = props.history.location.state.user;
	const age = findAge(user.birthdate);

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

	console.log(user);

	return (
		<ProfileContainer id="ProfileContainer">
			<UserPicturesContainer id="UserPicturesContainer">
				<UserPictures pictures={user.pictures} id="UserPictures"/>
			</UserPicturesContainer>
			<InfoContainer id="InfoContainer">
				<InfoText>@{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</InfoText>
				<InfoRowContainer id="InfoRowContainer">
					<InfoText>{user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}</InfoText>
					<InfoText>{user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}</InfoText>
				</InfoRowContainer>
				<InfoRowContainer id="InfoRowContainer">
					<InfoText>{user.gender.name.charAt(0).toUpperCase() + user.gender.name.slice(1)}</InfoText>
					<InfoText>{user.orientation.name.charAt(0).toUpperCase() + user.orientation.name.slice(1)}</InfoText>
					<InfoText>{age} year old</InfoText>
				</InfoRowContainer>
			</InfoContainer>
			<HobbyContainer id="HobbyContainer">
				{
					user.hobbies.map(hobby =>
						<Chip>
							<Icon>
								<i class="fab fa-slack-hash"></i>
							</Icon>
							<span>{hobby.name}</span>
						</Chip>
					)
				}
			</HobbyContainer>
			<BiographyContainer id="BiographyContainer">
				<BiographyText>
					{user.biography}
				</BiographyText>
			</BiographyContainer>
			<ActionContainer id="ActionContainer">
				{like ? <FavoriteBorder onClick={unlikeMatch} htmlColor={COLORS.PINK_FLASHY} fontSize="large"></FavoriteBorder> : <Favorite onClick={likeMatch} htmlColor={COLORS.PINK_FLASHY} fontSize="large"/>}
				{block ? <Replay onClick={unblockMatch} htmlColor={COLORS.PINK_FLASHY} fontSize="large"></Replay> : <Block onClick={blockMatch} htmlColor={COLORS.PINK_FLASHY} fontSize="large"></Block>}
			</ActionContainer>
		</ProfileContainer>
	);
}

export default Profile;