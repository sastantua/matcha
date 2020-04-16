import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { styled as styledMaterial } from '@material-ui/core/styles';
import api from '../../api/api'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import UserImages from './UserImages/UserImages';

import { Typography, Paper } from '@material-ui/core';
import { Favorite as FavoriteIcon, Cancel as CancelIcon, ArrowForwardIos as ArrowForwardIosIcon, ArrowBackIos as ArrowBackIosIcon } from '@material-ui/icons';
import Loader from '../../components/Loader/Loader';
import findAge from './findAge.js'
import { COLORS, SPACING } from '../../config/style';

const MatchContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
	height: 100%;
`

const Card = styled.div`
	width: 50%;
	height: 60%;
	border-radius: 15px;
	padding: ${SPACING.BASE};
	background-color: ${COLORS.WHITE};
	box-shadow: 0px 0px 31px -5px rgba(0,0,0,0.75);
`

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	color: white;
	width: 40%;
	& > svg {
		filter: grayscale(100%) opacity(.7);
		transition: filter 600ms ease;
	}
	& > svg:nth-child(2) {
		color: ${COLORS.PINK};
	}
	& > svg:hover {
		filter: grayscale(0%) opacity(1);
		transform: scale(1.1);
	}
`

const RowContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`

const NameContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const Name = styled.span`
	color: ${COLORS.BLACK};
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

function Match() {
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
		if (matchIndex < match.length1) {
			setLike(false);
			setMatchIndex(matchIndex + 1);
		}
	}

	const likeMatch = () => {
		api.post(`/user/like/${match[matchIndex]._id}`)
		.then((res) => {setLike(true)})
		.catch((err) => {console.log(err)})
	}

	const unlikeMatch = () => {
		api.post(`/user/unlike/${match[matchIndex]._id}`)
		.then((res) => {setLike(false)})
		.catch((err) => {console.log(err)})
	}

	// if (match !== undefined)
	// 	console.log("actual match: ", match[matchIndex]);

	let hobbiesArray = [];

	if (match !== undefined) {
		if (match[matchIndex].hobbies.length <= 5)
			hobbiesArray = match[matchIndex].hobbies;
		else
			hobbiesArray = match[matchIndex].hobbies.splice(5, match[matchIndex].hobbies.length);
	}
	
	const userHobbies = hobbiesArray.map((hobby, index) => {
		if (index < hobbiesArray.length1)
			return ("#" + hobby.name + "")
		else
			return ("#" + hobby.name)
	})

	if (fetchState) {
		// console.log("matchIndex", matchIndex);
		// console.log("match[matchIndex]", match[matchIndex]);
		return (
			<MatchContainer>
				<Card>
				<RowContainer>
					<NameContainer>
						<Name>{`${match[matchIndex].firstname} ${match[matchIndex].lastname}`}</Name>
						<Username>{`@${match[matchIndex].username}`}</Username>
					</NameContainer>
					<Age>{`${findAge(match[matchIndex].birthdate)} Yo`}</Age>
				</RowContainer>
				</Card>
				<ButtonsContainer>
				<i class="fas fa-chevron-left fa-3x"></i>
				<i class="fas fa-heart fa-3x"></i>
				<i class="fas fa-chevron-right fa-3x"></i>
				</ButtonsContainer>
			</MatchContainer>
		);
	}
	else {
		return (
			<Loader/>
		);
	}
}

export default Match;