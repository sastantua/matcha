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

const MatchContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: auto;
	height: 88vh;
	margin-top: 6vh;
	margin-bottom: 6vh;
	background-image: linear-gradient(90deg, #FF655B 30%, #FF5864 90%);
`

const CustomPaper = styledMaterial(Paper)({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "#ff3860",
	paddingTop: "0.5em",
	paddingLeft: "0.5em",
	paddingRight: "0.5em",
	paddingBottom: "0.5em",
	width: "70vw",
});

const Username = styled(Typography)({
	alignSelf: "start",
	marginTop: "2vh",
	marginLeft: "2vw",
	fontSize: "12px",
	color: "#000"
});

const Realname = styled(Typography)({
	alignSelf: "start",
	marginLeft: "2vw",
	fontSize: "12px",
	color: "#000"
});

const GenderAge = styled(Typography)({
	alignSelf: "start",
	marginTop: "0.5vh",
	marginLeft: "2vw",
	fontSize: "10px",
	color: "#000",
});

const Hobbies = styled(Typography)({
	alignSelf: "start",
	marginTop: "0.5vh",
	marginLeft: "2vw",
	fontSize: "10px",
	color: "#000",
})

const Biography = styled(Typography)({
	marginTop: "2vh",
	marginLeft: "2vw",
	// maxWidth: "20em",
	fontSize: "8px",
	color: "#000"
});

const ActionContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 1.5em;
	margin-bottom: 1em;
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
			<>
			<Header />
			<MatchContainer>
				<CustomPaper component='div'>
					<UserImages match={match} matchIndex={matchIndex}/>
					<Username>@{match[matchIndex].username}</Username>
					<Realname>{match[matchIndex].firstname} {match[matchIndex].lastname}</Realname>
					<GenderAge>{match[matchIndex].gender.name.charAt(0).toUpperCase() + match[matchIndex].gender.name.slice(1)} {findAge(match[matchIndex].birthdate)} years old {match[matchIndex].orientation.name}</GenderAge>
					<Hobbies>Interested in {userHobbies}</Hobbies>
					<Biography>{match[matchIndex].biography}</Biography>
					<ActionContainer>
						<ArrowBackIosIcon onClick={previousMatch} htmlColor='#FAE3D9' />
						{ like === false ? <FavoriteIcon onClick={likeMatch} htmlColor='#FAE3D9' style={{marginLeft: "1.5em"}} /> : <CancelIcon onClick={unlikeMatch} htmlColor='#FAE3D9' style={{marginLeft: "1.5em"}} />}
						<ArrowForwardIosIcon onClick={nextMatch} htmlColor='#FAE3D9' style={{marginLeft: "1.5em"}} />
					</ActionContainer>
				</CustomPaper>
			</MatchContainer>
			<Footer />
			</>
		);
	}
	else {
		return (
			<Loader/>
		);
	}
}

export default Match;