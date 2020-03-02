import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core'

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TextWrapper = styledMaterial(Typography)({
	fontSize: '0.5rem',
	color: "#FFF",
	marginTop: '3vh',
	marginBottom: '4vh',
});

function User(props) {
	const userHobbies = props.user.hobbies.map((hobby, index) => {
		if (index < 3)
			return (hobby.name);
		}
	);

	console.log(userHobbies);

	// let UserHobbiesJsx = userHobbies.map(hobby =>
	// 	<TextWrapper>{ hobby }</TextWrapper>
	// );

	return (
		<Link to="/profile" user={props.user} style={{ textDecoration: 'none' }}>
			<img src={props.user.pictures[0].url} alt={props.user.pictures[0].name} key={props.user.pictures[0].name} />
			{/* <UserHobbiesJsx/> */}

		</Link>
	);
}


function Result(props) {

	return (
		<ResultContainer>
			{
				props.result.map((user, index) =>
					<User user={user} key={index}/>	
				)
			}
		</ResultContainer>
	);
}

export default Result;