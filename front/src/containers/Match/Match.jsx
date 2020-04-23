import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";

import api from '../../api/api'
import { notifSocket } from '../../api/socket';
import { UserContext } from '../../context/UserContext';
import UserImages from './UserImages/UserImages';

import Loader from '../../components/Loader/Loader';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { COLORS, SPACING, BREAK_POINTS } from '../../config/style';

import findAge from '../../helper/findAge.js'

const MatchContainer = styled.div`
	padding: ${SPACING.BASE};
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: auto;
`

const Card = styled.div`
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	width: 50%;
	border-radius: 15px;
	padding: ${SPACING.BASE};
	/* background-color: ${COLORS.WHITE}; */
	background-image: linear-gradient(90deg, ${COLORS.ORANGE_GRADIENT} 30%, ${COLORS.PINK_GRADIENT} 90%);
	box-shadow: 0px 0px 31px -5px rgba(0,0,0,0.75);
`

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin-top: ${SPACING.BASE};
	color: white;
	width: 40%;
	& > div {
		filter: grayscale(100%) opacity(.7);
		transition: filter 600ms ease;
		cursor: pointer;
	}
	& > div:nth-child(2) {
		color: ${COLORS.PINK};
	}
	& > div:nth-child(2) > svg {
		height: 48px;
		width: auto;
	}
	& > div:hover {
		filter: grayscale(0%) opacity(1);
		transform: scale(1.1);
	}
`

const HeadContainer = styled.div`
	display: flex;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: row;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: column;
		align-items: center;
	}
`

const ImagesContainer = styled.div`
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: 50%;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: 100%;
	}
`

const Infos = styled.div`
	display: flex;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		flex-direction: column;
		align-items: center;
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		margin-left: ${SPACING.BASE};
	}
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: row;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: column;
		margin-top: ${SPACING.XS}
	}
`

const Text = styled.span`
	color: ${COLORS.BLACK};
	width: 50%;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 600;
		font-size: 1.3em;
		width: auto;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 400;
		font-size: 0.8em;
	}
`

const NameContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: ${SPACING.BASE};
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: auto;
		margin-left: ${SPACING.XS};
	}
`

const GenderOrientationAgeContainer = styled.div`
	display: flex;
	flex-direction: row;
	& > :nth-child(n+2) {
		margin-left: ${SPACING.XXS}
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: auto;
	}
`

const RowContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
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

const ChipsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: ${SPACING.BASE} 0;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: row;
		margin: ${SPACING.XS} 0;
	}
`

const Biography = styled.span`
	display: flex;
	justify-content: stretch;
	min-height: 50px;
	padding: ${SPACING.XXS} ${SPACING.XXS};
	border-radius: 15px;
	background-color: ${COLORS.GREY_LIGHT};
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-size: 0.5rem;
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

function Match() {
	const { user } = useContext(UserContext);
	const [like, setLike] = useState(false);
	const [match, setMatch] = useState();
	const [matchIndex, setMatchIndex] = useState(0);
	const [fetchState, setFetchState] = useState(false);

	useEffect(() => {
		api.get('/user/match')
		.then((res) => {
			setMatch(res.data);
			setFetchState(true);
			console.log(res.data);
		})
		.catch((err) => {console.log(err);})
	}, []);

	const previousMatch = () => {
		if (matchIndex > 0) {
			setLike(false);
			setMatchIndex(matchIndex1);
		}
	}

	const nextMatch = () => {
		console.log("yipikai")
		if (matchIndex < match.length1) {
			setLike(false);
			setMatchIndex(matchIndex + 1);
		}
	}

	const likeMatch = () => {
		if (like) {
			api.post(`/user/unlike/${match[matchIndex]._id}`)
			.then((res) => {setLike(false)})
			.catch((err) => {console.log(err)})
		} else {
		api.post(`/user/like/${match[matchIndex]._id}`)
		.then((res) => {setLike(true)})
		.catch((err) => {console.log(err)})
		notifSocket.emit('notification', {
			type: 'like',
			to: match[matchIndex]._id,
			from: user._id
		})
		}
	}

	return (
		fetchState ?
			<MatchContainer>
				<Card>
				<HeadContainer id="HeadContainer">
					<ImagesContainer id="ImagesContainer">
						<UserImages match={match[matchIndex]} id="UserImages"/>
					</ImagesContainer>
					<Infos id="Infos">
						<NameContainer id="NameContainer">
							<Text>{`@${match[matchIndex].username.charAt(0).toUpperCase() + match[matchIndex].username.slice(1)}`}</Text>
							<Text>{`${match[matchIndex].firstname.charAt(0).toUpperCase() + match[matchIndex].firstname.slice(1)} ${match[matchIndex].lastname.charAt(0).toUpperCase() + match[matchIndex].lastname.slice(1)}`}</Text>
							<GenderOrientationAgeContainer id="GenderOrientationAgeContainer">
								<Text>{match[matchIndex].gender.name.charAt(0).toUpperCase() + match[matchIndex].gender.name.slice(1)}</Text>
								<Text>{match[matchIndex].orientation.name.charAt(0).toUpperCase() + match[matchIndex].orientation.name.slice(1)}</Text>
								<Text>{`${findAge(match[matchIndex].birthdate)} Yo`}</Text>
							</GenderOrientationAgeContainer>
						</NameContainer>
					</Infos>
				</HeadContainer>
				<RowContainer id="RowContainer">
					<ChipsContainer id="ChipsContainer">
					{
						match[matchIndex].hobbies.map(hobby =>
							<Chip id="Chip">
								<Icon className="fab fa-slack-hash">
								</Icon>
								<span>{hobby.name}</span>
							</Chip>
						)
					}
					</ChipsContainer>
				</RowContainer>
				<Biography id="Biography">
					{`${match[matchIndex].biography}`}
				</Biography>
				<Bottom>
					{match[matchIndex].likes && <Box>{"Already likes you"}</Box>}
					{match[matchIndex].isSeen && <Box>{"Already saw your profile"}</Box>}
				</Bottom>
				</Card>
				<ButtonsContainer>
					<div onClick={previousMatch}>
						<i className="fas fa-chevron-left fa-3x"></i>
					</div>
					<div onClick={likeMatch}>
						{like ? <Favorite fontSize="large"/> : <FavoriteBorder fontSize="large"/>}
					</div>
					<div onClick={nextMatch}>
						<i className="fas fa-chevron-right fa-3x"></i>
					</div>
				</ButtonsContainer>
			</MatchContainer>
		: 
		<Loader/>
	);
}

export default Match;