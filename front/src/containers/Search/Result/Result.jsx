import React from 'react';
import styled from 'styled-components';

import UserCard from '../../../helper/UserCard';

const ResultContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	& > * {
		margin-top: 4vh;
	}
`

function Result(props) {

	return (
		<ResultContainer id="ResultContainer">
			{
				props.result.length > 0 && props.result.map((user, index) => {
					return <UserCard user={user} key={index}/>
				})
			}
		</ResultContainer>
	);
}

export default Result;