import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import api from '../../api/api'
import { notifSocket } from '../../api/socket';
import { UserContext } from '../../context/UserContext';
import UserImages from './UserImages/UserImages';

import { Favorite, FavoriteBorder } from '@material-ui/icons';
import Loader from '../../components/Loader/Loader';
import findAge from './findAge.js'
import { COLORS, SPACING, BREAK_POINTS } from '../../config/style';

const MatchContainer = styled.div`
	padding: ${SPACING.BASE};
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
`

const Card = styled.div`
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	width: 50%;
	min-height: 60%;
	border-radius: 15px;
	padding: ${SPACING.BASE};
	background-color: ${COLORS.WHITE};
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

const RowContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
`

const HeadContainer = styled.div`
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		flex-direction: column;
		align-items: center;
	}
	display: flex;
`

const ImagesContainer = styled.div`
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		width: auto;
	}
	width: 40%;
`

const Infos = styled.div`
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
`

const NameContainer = styled.div`
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		width: auto;
	}
	display: flex;
	flex-direction: column;
	width: 50%;
`

const Name = styled.span`
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		width: auto;
	}
	color: ${COLORS.BLACK};
	width: 50%;
	font-weight: 600;
	font-size: 1.3em;
`
const Username = styled.span`
	color: ${COLORS.GREY};
`

const Age = styled.span`
	color: ${COLORS.BLACK};
	font-size: 1.6em;
	font-weight: 600;
`

const Biography = styled.span`
	display: flex;
	justify-content: stretch;
	min-height: 50px;
	padding: ${SPACING.XXS} ${SPACING.XS};
	border-radius: 15px;
	background-color: ${COLORS.GREY_LIGHT};
`;

const Chip = styled.div`
	display: flex;
	align-items: center;
	background-color: ${COLORS.PINK_LIGHT};
	color: white;
	padding: ${SPACING.XXS} ${SPACING.XS};
	border-radius: 32px;
	margin: ${SPACING.XXS};
	font-weight: 600;
`

const Icon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 28px;
	width: 28px;
	border-radius: 50%;
	background-color: ${COLORS.GREY};
	opacity: .7;
	box-shadow: 0px 0px 102px -20px rgba(0,0,0,0.75);
	margin-right: ${SPACING.XS};
`

const ChipsContainer = styled.div`
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		flex-direction: column;
	}
	display: flex;
	flex-wrap: wrap;
	margin: ${SPACING.BASE} 0;
	& > ${Chip}:first-child {
		margin-left: 0;
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
	padding: ${SPACING.XXS} ${SPACING.XS};
	background-color: ${COLORS.GREY};
	border-radius: 32px;
`

function Match() {
	const { user, setUser } = useContext(UserContext);
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

	// if (match !== undefined)
	// 	console.log("actual match: ", match[matchIndex]);
	return (
		fetchState ?
			<MatchContainer>
				<Card>
				<HeadContainer>
					<ImagesContainer>
						<UserImages match={match[matchIndex]}/>
					</ImagesContainer>
					<Infos>
						<NameContainer>
							<Name>{`${match[matchIndex].firstname} ${match[matchIndex].lastname}`}</Name>
							<Username>{`@${match[matchIndex].username}`}</Username>
						</NameContainer>
						<Name>{match[matchIndex].gender.name}</Name>
						<Name>{match[matchIndex].orientation.name}</Name>
						<Name>{`${findAge(match[matchIndex].birthdate)} Yo`}</Name>
					</Infos>
				</HeadContainer>
				<RowContainer>
					<ChipsContainer>
					{
						match[matchIndex].hobbies.map(hobby =>
							<Chip>
								<Icon>
									<i class="fab fa-slack-hash"></i>
								</Icon>
								<span>{hobby.name}</span>
							</Chip>
						)
					}
					</ChipsContainer>
				</RowContainer>
				<Biography>
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