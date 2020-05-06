import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import { useImmer } from 'use-immer';
import { getPreciseDistance } from 'geolib';

import api from '../../api/api'
import { notifSocket } from '../../api/socket';
import { UserContext } from '../../context/UserContext';

import LonelyCat from '../../media/lonelycat.png'
import UserImages from '../../helper/UserImages';
import Loader from '../../components/Loader/Loader';
import findAge from '../../helper/findAge.js'
import { COLORS, SPACING, BREAK_POINTS } from '../../config/style';


import { FavoriteBorder } from '@material-ui/icons';

const MatchContainer = styled.div`
	padding: ${SPACING.BASE};
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: auto;
`

const Card = styled.div`
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: 50%;
		padding: ${SPACING.BASE};
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: ${SPACING.XS};
		width: 80%;
	}
	border-radius: 15px;
	background-image: linear-gradient(90deg, ${COLORS.ORANGE_GRADIENT} 30%, ${COLORS.PINK_GRADIENT} 90%);
	box-shadow: 0px 0px 31px -5px rgba(0,0,0,0.75);
`

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin-top: ${SPACING.BASE};
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: 50%;
		padding: ${SPACING.BASE};
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: 80%;
		padding: ${SPACING.XS};
	}
	color: white;
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
		margin-left: ${SPACING.XS};
	}
`

const RowContainer = styled.div`
	display: flex;
	flex-direction: row;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		justify-content: center;
		align-items: center;
	}
	& > :nth-child(n+2) {
		margin-left: ${SPACING.XXS}
	}
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
		&& {
			height: 12px;
			width: 12px;
		}
		margin-right: ${SPACING.XXS};
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		&& {
			height: 28px;
			width: 28px;
		}
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
	border-radius: 32px;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-size: 1em;
		font-weight: 600;

	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-size: 0.5em;
		font-weight: 300;
	}
`

const ChipsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: ${SPACING.BASE} 0;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: row;
		justify-content: center;
		align-items: center;
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
	& > * {
		margin-top: ${SPACING.XS};
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		flex-direction: column;
		align-items: center;
	}
	margin-top: ${SPACING.BASE};
	display: flex;
	justify-content: space-evenly;
`

const MaliciousContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	& > :nth-child(2) {
		margin-left: ${SPACING.XS};
	}
	& > div:hover {
		filter: grayscale(0%) opacity(1);
		transform: scale(1.1);
	}
`

const Box = styled.div`
	padding: ${SPACING.XXS} ${SPACING.XXS};
	background-color: ${COLORS.GREY};
	border-radius: 32px;
`

const LonelyCatContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		& > * {
			width: 80%;
			margin-top: 4vh;
		}
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		& > * {
			width: 50%;
			margin-top: 4vh;
		}
	}
`

function Match() {
	const [user] = useContext(UserContext);
	const [like, setLike] = useState(false);
	const [match, setMatch] = useImmer();
	const [matchIndex, setMatchIndex] = useState(1);
	const [fetchState, setFetchState] = useState(false);

	useEffect(() => {
		api.get('/user/match')
		.then((res) => {
			setMatch(() => res.data);
			setFetchState(true);
		})
		.catch((err) => {console.log(err);})
	}, [setMatch]);

	useEffect(() => {
		if (match && match.length > 0 && match[matchIndex] !== undefined) {
			api.post(`/user/saw/${match[matchIndex]._id}`)
			.then((res) => {
				notifSocket.emit('notification', {
					type: 'visit',
					to: match[matchIndex]._id,
					from: user._id
				})
			})
			.catch((err) => console.log(err))
		}
	}, [user, match, matchIndex])

	const previousMatch = () => {
		if (matchIndex > 0) {
			setLike(false);
			setMatchIndex(matchIndex1);
		}
	}

	const nextMatch = () => {
		if (matchIndex < match.length1) {
			setLike(false);
			setMatchIndex(matchIndex + 1);
		}
	}

	const likeMatch = () => {
		api.post(`/user/like/${match[matchIndex]._id}`)
		.then((res) => {
			notifSocket.emit('notification', {
				type: 'like',
				to: match[matchIndex]._id,
				from: user._id
			})
			setMatch((draft) => {
				draft.splice(matchIndex, 1);
			})
		})
		.catch((err) => {console.log(err)})
	}

	const blockMatch = () => {
		api.post(`/user/block/${match[matchIndex]._id}`)
		.then((res) => {
			notifSocket.emit('notification', {
				type: 'block',
				to: match[matchIndex]._id,
				from: user._id
			});
			setMatch((draft) => {
				draft.splice(matchIndex, 1);
			});
		})
		.catch((err) => {console.log(err)})
	}

	const reportMatch = () => {
		api.post(`/user/report/${match[matchIndex]._id}`)
		.then(res => {
			setMatch((draft) => {
				draft.splice(matchIndex, 1);
			});
		})
		.catch((err) => {console.log(err)})
	}

	const getDistance = (user_a, user_b) => {
		return getPreciseDistance({latitude: user_a.location.lat, longitude: user_a.location.lng}, {latitude: user_b.location.lat, longitude: user_b.location.lng}) * 0.001;
	}

	// if (user && match && match.length)
	// 	var distance = getDistance(match[matchIndex], user).toString().split('.')[0];

	return (
		fetchState ?
			(match && match.length > 0 && match[matchIndex] !== undefined) ?
				<MatchContainer>
					<Card>
					<HeadContainer id="HeadContainer">
						<ImagesContainer id="ImagesContainer">
							<UserImages match={match[matchIndex]} id="UserImages"/>
						</ImagesContainer>
						<Infos id="Infos">
							<NameContainer id="NameContainer">
								<Text>{`@${match[matchIndex].username.charAt(0).toUpperCase() + match[matchIndex].username.slice(1)}`}</Text>
								<RowContainer id="RowContainer">
									<Text>{match[matchIndex].firstname.charAt(0).toUpperCase() + match[matchIndex].firstname.slice(1)}</Text>
									<Text>{match[matchIndex].lastname.charAt(0).toUpperCase() + match[matchIndex].lastname.slice(1)}</Text>
								</RowContainer>
								<RowContainer id="RowContainer">
									<Text>{match[matchIndex].gender.name.charAt(0).toUpperCase() + match[matchIndex].gender.name.slice(1)}</Text>
									<Text>{match[matchIndex].orientation.name.charAt(0).toUpperCase() + match[matchIndex].orientation.name.slice(1)}</Text>
									<Text>{`${findAge(match[matchIndex].birthdate)} Yo`}</Text>
								</RowContainer>
									<Text>Distance: {getDistance(match[matchIndex], user).toString().split('.')[0]} km</Text>
									<Text>Populairty score: {match[matchIndex].popularity}</Text>
							</NameContainer>
						</Infos>
					</HeadContainer>
					<RowContainer id="RowContainer">
						<ChipsContainer id="ChipsContainer">
						{
							match[matchIndex].hobbies.map(hobby =>
								<Chip id="Chip" key={hobby.name}>
									<Icon className="fab fa-slack-hash"/>
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
						<MaliciousContainer>
							<div onClick={blockMatch}>
								<i className="fas fa-user-lock"></i>
							</div>
							<div onClick={reportMatch}>
								<i className="fas fa-robot"></i>
							</div>
						</MaliciousContainer>
						{match[matchIndex].likes && <Box>{"Already likes you"}</Box>}
						{match[matchIndex].isSeen && <Box>{"Already saw your profile"}</Box>}
					</Bottom>
					</Card>
					<ButtonsContainer>
						<div onClick={previousMatch}>
							<i className="fas fa-chevron-left fa-3x"></i>
						</div>
						<div onClick={likeMatch}>
							<FavoriteBorder fontSize="large"/>
						</div>
						<div onClick={nextMatch}>
							<i className="fas fa-chevron-right fa-3x"></i>
						</div>
					</ButtonsContainer>
				</MatchContainer>
				:
				<LonelyCatContainer>
					<img src={LonelyCat} alt=""/>
				</LonelyCatContainer>
		: 
		<Loader/>
	);
}

export default Match;