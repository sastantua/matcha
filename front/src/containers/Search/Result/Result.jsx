import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';

import api from '../../../api/api'
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
	margin-top: 3vh;
`

const PaperContainer = styled(Paper)({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#ff3860',
	paddingTop: '0.5em',
	paddingLeft: '0.5em',
	paddingRight: '0.5em',
	paddingBottom: '0.5em',
	maxWidth: '70vw',
});

const TextWrapper = styledMaterial(Typography)({
	fontSize: '1rem',
	color: "#FFF",
	marginTop: '2vh',
	marginBottom: '1vh',
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

const NameAgeContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

function User(props) {
	const age = findAge(props.user.birthdate);
	
	let hobbiesArray = [];
	
	if (props.user.hobbies.length <= 5)
		hobbiesArray = props.user.hobbies; 
	else 
		hobbiesArray = props.user.hobbies.splice(5, props.user.hobbies.length);
	
	console.log("props.user.hobbies", props.user.hobbies);
	const userHobbies = hobbiesArray.map((hobby, index) => {
		if (index < hobbiesArray.length1)
			return ("#" + hobby.name + " and ")
		else if (index < hobbiesArray.length2)
			return ("#" + hobby.name + ", ")
		else
			return ("#" + hobby.name)
	})

	return (
		<Link to={{pathname: '/profile', state: { user: props.user }}} style={{ textDecoration: 'none' }}>
			<UserContainer>
				<PaperContainer elevation={3} component="div">
					<img src={props.user.pictures[0].url} alt={props.user.pictures[0].name} key={props.user.pictures[0].name} style={{width: '70vw'}}/>
					<NameAgeContainer>
						<TextWrapper>{props.user.firstname} {props.user.lastname}</TextWrapper>
						<TextWrapper style={{marginLeft: '2vw'}}>{age}</TextWrapper>
					</NameAgeContainer>
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