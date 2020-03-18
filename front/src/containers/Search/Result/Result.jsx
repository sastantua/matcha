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
	const [userHobbies, setUserHobbies] = useState();
	// const { user, setUser } = useContext(UserContext);
	
	const userPosition = usePosition();

	let users = props.result.map(user => user);

	useEffect(() => {
		const getUserHobbies = async () => {
			const result = await api.get('/user/hobby')
			.then((res) => {setUserHobbies(res.data);})
			.catch((err) => {console.log(err);})
		};
	}, []);
	
	
	// console.log("userPosition = ", userPosition);
	// console.log("sort type = ", props.sort);
	// console.log("users in result before sort = ", users);
	
	if (props.sort !== undefined) {
		if (props.sort === "age") {
			users.sort((a, b) => new Date(a.birthdate)new Date(b.birthdate));
		}
		else if (props.sort === "popularity") {
			users.sort((a, b) => a.populairtyb.populairty);
		}
		else if (props.sort === "proximity") {
			users.sort((a, b) => {
				let latDiff_A = userPosition.latitudea.location.lat;
				let lngDiff_A = userPosition.longitudea.location.lng;
				let latDiff_B = userPosition.latitudeb.location.lat;
				let lngDiff_B = userPosition.longitudeb.location.lng;
				
				let scoreA = latDiff_A + lngDiff_A;
				let scoreB = latDiff_B + lngDiff_B;

				if (scoreA >= scoreB)
					return (1);
				else
					return (-1);
			});
		}
		else if (props.sort === "hobby") {
			console.log("user herrrrre", userHobbies);
		}
	}
	console.log("users in result after sort = ", users);

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