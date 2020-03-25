import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { styled as styledMaterial } from '@material-ui/core/styles';
import api from '../../api/api'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import UserImages from './UserImages/UserImages';

import { Typography, Paper } from '@material-ui/core';
import { Favorite as FavoriteIcon, ArrowForwardIos as ArrowForwardIosIcon, ArrowBackIos as ArrowBackIosIcon } from '@material-ui/icons';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import './Match.css'

const MatchContainer = styled.div`
	display: flex;
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
	maxWidth: "70vw",
});

const ImageContainer = styled.img`
	width: 12em;
	height: 12em;
`

const ActionContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 1.5em;
	margin-bottom: 1em;
`
const Username = styled(Typography)({
	alignSelf: "start",
	marginTop: "0.5vh",
	marginLeft: "4vw",
});

const Biography = styled(Typography)({
	maxWidth: "20em",
	fontSize: "8px",

});


function Match() {
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
		if (matchIndex > 0)
			setMatchIndex(matchIndex1);
	}

	const nextMatch = () => {
		if (matchIndex < match.length1)
			setMatchIndex(matchIndex + 1);
	}

	console.log("match", match);

	if (fetchState) {
		return (
			<>
			<Header />
			<MatchContainer>
				<CustomPaper component='div'>
					<UserImages match={match} matchIndex={matchIndex}/>
					<Username>Nico</Username>
					<Biography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					    ut labore et dolore magna aliqua.
					</Biography>
					<ActionContainer>
						<ArrowBackIosIcon onClick={previousMatch} htmlColor='#FAE3D9' />
						<FavoriteIcon htmlColor='#FAE3D9' className="icon-btn" />
						<ArrowForwardIosIcon onClick={nextMatch} htmlColor='#FAE3D9' className="icon-btn" />
					</ActionContainer>
				</CustomPaper>
			</MatchContainer>
			<Footer />
			</>
		);
	}
	else {
		return (
			<LoadingPage/>
		);
	}
}

export default Match;