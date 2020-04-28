import React, {useState, useEffect} from 'react';
import styled from 'styled-components'

import api from '../../api/api';
import UserCard from '../../helper/UserCard';
import { COLORS, BREAK_POINTS } from '../../config/style'

const SawContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const SubSawContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10vh 0;
	width: 100%;
	height: auto;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		& > * {
			width: 80%;
			margin-top: 4vh;
		}
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		& > * {
			width: 50%;
			margin-top: 4vh;
		}
	}
`

function Saw() {
	const [result, setResult] = useState([]);

	useEffect(() => {
		api.get('/user/saw')
		.then((res) => {
			console.log(res.data);
			setResult(res.data);
		})
		.catch((err) => {
			console.log(err);
		})
	}, []);

	return (
		<SawContainer id="SawContainer">
			<SubSawContainer id="SubSawContainer">
				{
					result.length > 0 && result.map((user, index) => {
						return <UserCard user={result[index].user} key={index}/>
					})
				}
			</SubSawContainer>
		</SawContainer>
	);
}

export default Saw;