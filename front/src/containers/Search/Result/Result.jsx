import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// import { useContext } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';

import api from '../../../api/api'
// import { UserContext } from '../../../context/UserContext';
import { usePosition } from '../../../hooks/usePosition'
import { Typography, Paper } from '@material-ui/core'
import findAge from './Helper/findAge.js'
import sortAge from './Helper/sortAge.js'
import sortHobby from './Helper/sortHobby.js'
import sortProximity from './Helper/sortProximity.js'
import sortPopularity from './Helper/sortPopularity.js'

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

const sortUsers = (users, userPosition, userHobbies, sort, ascending, descending) => {
	console.log("Entering sort function");
	console.log("users = ", users);
	console.log("sort = ", sort);
	console.log("ascending = ", ascending);
	console.log("descending = ", descending);
	if (sort !== undefined && ascending !== undefined && descending !== undefined) {
		if (sort === "age")
			users.sort((a, b) => sortAge(ascending, descending, a, b));
		else if (sort === "popularity")
			users.sort((a, b) => sortPopularity(ascending, descending, a, b));
		else if (sort === "proximity")
			users.sort((a, b) => sortProximity(userPosition, ascending, descending, a, b));
		else if (sort === "hobby")
			users.sort((a, b) => sortHobby(userHobbies, a, b));
	}
	console.log("users after sort = ", users);
}

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
	const userPosition = usePosition();
	const [userHobbies, setUserHobbies] = useState();

	let users = props.result.map(user => user);

	useEffect(() => {
		api.get('/user/hobby')
		.then((res) => {setUserHobbies(res.data)})
		.catch((err) => {console.log(err)})
	});
	
	useEffect(() => {
		sortUsers(users, userPosition, userHobbies, props.sort, props.ascending, props.descending);
	}, [props.sort, props.ascending, props.descending])

	const Users = () => {
		return (
			users.map((user, index) =>
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