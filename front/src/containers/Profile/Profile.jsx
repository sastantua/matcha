import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components'
import { getPreciseDistance } from 'geolib';

import api from '../../api/api'
import findAge from '../../helper/findAge';
import UserPictures from '../../helper/UserImages';
import { COLORS, SPACING, BREAK_POINTS } from '../../config/style';

import { Block, Replay } from '@material-ui/icons';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { notifSocket } from '../../api/socket';
import { UserContext } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';

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
	margin-top: 10vh;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		min-width: 15vw;
		width: 50%;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: 65%;
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
	margin: ${SPACING.XS} 0;
	padding: ${SPACING.XXS} ${SPACING.XXS};
	border-radius: 15px;
	background-color: ${COLORS.GREY_LIGHT};
`

const BiographyText = styled.span`
	color: ${COLORS.BLACK};
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 400;
		font-size: 1.3em;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 300;
		font-size: 0.8em;
	}
`

const Bottom = styled.div`
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		flex-direction: column;
		align-items: center;
	}
	margin-top: ${SPACING.BASE};
	display: flex;
	justify-content: space-evenly;
`
const Box = styled.div`
	padding: ${SPACING.XXS} ${SPACING.XXS};
	background-color: ${COLORS.GREY};
	border-radius: 32px;
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
	const history = useHistory();
	const [user] = useContext(UserContext);
	const [like, setLike] = useState(false);
	const [block, setBlock] = useState(false);

	const getDistance = (user_a, user_b) => {
		return getPreciseDistance({
			latitude: user_a.location.lat,
			longitude: user_a.location.lng
		},
		{
			latitude: user_b.location.lat,
			longitude: user_b.location.lng
		}) * 0.001;
	}
	
	const profile = props.history.location.state.user ? props.history.location.state.user : undefined;
	const age = findAge(profile.birthdate);
	let distance = null;

	if (profile !== null && user !== null && profile !== undefined && user !== undefined)
		distance = getDistance(profile, user).toString().split('.')[0];

	// Rajoute ici le call saw
	useEffect(() => {
		user && notifSocket.emit('notification', {
			type: 'visit',
			to: profile._id,
			from: user._id
		})
	}, [user, profile])

	if (props.history.location.state === undefined) {
		return (
			<div></div>
		);
	}

	const likeMatch = () => {
		api.post(`/user/like/${profile._id}`)
		.then((res) => {
			setLike(true);
			notifSocket.emit('notification', {
				type: 'like',
				to: profile._id,
				from: user._id
			})
		})
		.catch((err) => {console.log(err)})
	}

	const unlikeMatch = () => {
		api.post(`/user/unlike/${profile._id}`)
		.then((res) => {
			setLike(false);
			notifSocket.emit('notification', {
				type: 'unlike',
				to: profile._id,
				from: user._id
			})
		})
		.catch((err) => {console.log(err)})
	}

	const blockMatch = () => {
		api.post(`/user/block/${profile._id}`)
		.then((res) => {
			setBlock(true);
			notifSocket.emit('notification', {
				type: 'block',
				to: profile._id,
				from: user._id
			})
			history.goBack();
		})
		.catch((err) => {console.log(err)})
		
	}

	console.log(profile);

	return (
		<ProfileContainer id="ProfileContainer">
			<UserPicturesContainer id="UserPicturesContainer">
				<UserPictures pictures={profile.pictures} id="UserPictures"/>
			</UserPicturesContainer>
			<InfoContainer id="InfoContainer">
				<InfoText>@{profile.username.charAt(0).toUpperCase() + profile.username.slice(1)}</InfoText>
				<InfoRowContainer id="InfoRowContainer">
					<InfoText>
						{profile.firstname.charAt(0).toUpperCase() + profile.firstname.slice(1) + " "}
						{profile.lastname.charAt(0).toUpperCase() + profile.lastname.slice(1)}
					</InfoText>
				</InfoRowContainer>
				<InfoRowContainer id="InfoRowContainer">
					<InfoText>
						{profile.gender.name.charAt(0).toUpperCase() + profile.gender.name.slice(1) + " "}
						{profile.orientation.name.charAt(0).toUpperCase() + profile.orientation.name.slice(1) + " "}
						{age + " year old"}
					</InfoText>
				</InfoRowContainer>
				<InfoText>Distance: {distance} km</InfoText>
				<InfoText>Populairty score: {profile.popularity}</InfoText>
				<InfoText>{profile.status === 'online' ? "Online" : `Offline since ${new Date(profile.status).toLocaleString()}`}</InfoText>
			</InfoContainer>
			<HobbyContainer id="HobbyContainer">
				{
					profile.hobbies.map(hobby =>
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
					{profile.biography}
				</BiographyText>
			</BiographyContainer>
			<Bottom>
					{profile.likes && <Box>{"Already likes you"}</Box>}
					{profile.isSeen && <Box>{"Already saw your profile"}</Box>}
			</Bottom>
			<ActionContainer id="ActionContainer">
				{like ? <FavoriteBorder onClick={unlikeMatch} htmlColor={COLORS.PINK_FLASHY} fontSize="large"></FavoriteBorder> : <Favorite onClick={likeMatch} htmlColor={COLORS.PINK_FLASHY} fontSize="large"/>}
				<Block onClick={blockMatch} htmlColor={COLORS.PINK_FLASHY} fontSize="large"></Block>
			</ActionContainer>
		</ProfileContainer>
	);
}

export default Profile;