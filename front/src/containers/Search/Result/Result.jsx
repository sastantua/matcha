import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';

import { Typography, Paper } from '@material-ui/core'
import findAge from './Helper/findAge.js'
import sortAge from './Helper/sortAge.js'

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

const SmallTextWrapper = styledMaterial(Typography)({
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

	return (
		<Link to={{pathname: '/profile', state: { user: props.user }}} style={{ textDecoration: 'none' }}>
			<UserContainer>
				<PaperContainer elevation={3} component="div">
					<img src={props.user.pictures[0].url} alt={props.user.pictures[0].name} key={props.user.pictures[0].name} style={{width: '70vw'}}/>
					<NameAgeContainer>
						<TextWrapper>{props.user.firstname} {props.user.lastname}</TextWrapper>
						<TextWrapper style={{marginLeft: '2vw'}}>{age}</TextWrapper>
					</NameAgeContainer>
					<SmallTextWrapper>{props.user.biography}</SmallTextWrapper>
				</PaperContainer>
			</UserContainer>
		</Link>
	);
}

function Result(props) {

	const users = props.result.map(user => user);
	let test = sortAge(users);
	console.log(users);

	const Users = () => {
		return (
			test.map((user, index) =>
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