import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';

import api from '../../../api/api'
import { Favorite as FavoriteIcon, Cancel as CancelIcon, ArrowForwardIos as ArrowForwardIosIcon, ArrowBackIos as ArrowBackIosIcon } from '@material-ui/icons';
import { Typography, Paper } from '@material-ui/core'
import findAge from '../Helper/findAge.js'

const ResultContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const UserContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 4vh;
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

const GenderAgeContainer = styled.div`
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
});

const GenderAge = styledMaterial(Typography)({
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


function User(props) {
	const [like, setLike] = useState(false);

	const age = findAge(props.user.birthdate);
	
	let hobbiesArray = [];
	
	if (props.user.hobbies.length <= 5)
		hobbiesArray = props.user.hobbies; 
	else 
		hobbiesArray = props.user.hobbies.splice(5, props.user.hobbies.length);
	
	console.log("props.user.hobbies", props.user.hobbies);
	const userHobbies = hobbiesArray.map((hobby, index) => {
		if (index < hobbiesArray.length1)
			return ("#" + hobby.name + "")
		else
			return ("#" + hobby.name)
	})

	return (
		<Link to={{pathname: '/profile', state: { user: props.user }}} style={{ textDecoration: 'none' }}>
			<UserContainer>
				<PaperContainer elevation={3} component="div">
					<img src={props.user.pictures[0].url} alt={props.user.pictures[0].name} key={props.user.pictures[0].name} style={{width: '70vw'}}/>
					{/* <Username>@{props.user.username}</Username> */}
					<Name>{props.user.firstname} {props.user.lastname}</Name>
					<GenderAgeContainer>
						<GenderAge>{props.user.gender.name.charAt(0).toUpperCase() + props.user.gender.name.slice(1)}</GenderAge>
						<GenderAge style={{marginLeft: '2vw'}}>{findAge(props.user.birthdate)} years old</GenderAge>
					</GenderAgeContainer>
					<Hobbies>Interested in {userHobbies}</Hobbies>
					<Biography>{props.user.biography}</Biography>
				</PaperContainer>
			</UserContainer>
		</Link>
	);
}

function Result(props) {
	const Users = () => {
		return (
			props.result.map((user, index) =>
				<User user={user} key={index}/>
		));
	}

	return (
		<ResultContainer>
			<Users/>
		</ResultContainer>
	);
}

export default Result;