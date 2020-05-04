import React, {useState, useEffect} from 'react';
import styled from 'styled-components'

import api from '../../api/api';
import UserCard from '../../helper/UserCard';
import { COLORS, BREAK_POINTS } from '../../config/style'
import LonelyCat from '../../media/lonelycat.png'

import Dropdown from './Dropdown';

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

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Text = styled.span`
	color: ${COLORS.WHITE};
	width: 50%;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 600;
		font-size: 1.3em;
		width: auto;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 400;
		font-size: 0.8em;
	}
`

function Saw() {
	const [likeResult, setLikeResult] = useState([]);
	const [visitedResult, setVisitedResult] = useState([]);
	const [userChoice, setUserChoice] = useState();

	useEffect(() => {
		api.get('/user/likes')
		.then((res) => {
			setLikeResult(res.data);
		})
		.catch((err) => {
			console.log(err);
		})
	}, []);

	useEffect(() => {
		api.get('/user/saw')
		.then((res) => {
			setVisitedResult(res.data);
		})
		.catch((err) => {
			console.log(err);
		})
	}, []);

	const Liked = () => {
		let ReturnJsx = null;
		if (likeResult.length > 0) {
			ReturnJsx = () => likeResult.map((user, index) => {
				return (
					<Container key={index}>
						<UserCard user={likeResult[index].user}/>
						<Text>
							Liked your profile {new Date(visitedResult[index].date).toLocaleString('en-US')}
						</Text>
					</Container>
				);
			})
		}
		else {
			ReturnJsx = () => {
				return <img src={LonelyCat} alt=""/>
			}
		}
		return <ReturnJsx/>;
	}

	const Visited = () => {
		let ReturnJsx = null;
		if (visitedResult.length > 0) {
			ReturnJsx = () => visitedResult.map((user, index) => {
				return (
					<Container key={index}>
						<UserCard user={visitedResult[index].user}/>
						<Text>
							Saw your profile {new Date(visitedResult[index].date).toLocaleString('en-US')}
						</Text>
					</Container>
				);
			})
		}
		else {
			ReturnJsx = () => {
				return <img src={LonelyCat} alt=""/>
			}
		}
		return <ReturnJsx/>;
	}

	return (
		<SawContainer id="SawContainer">
			<SubSawContainer id="SubSawContainer">
				<Dropdown userChoice={userChoice} setUserChoice={setUserChoice}/>
				{ userChoice === "1" && <Liked/> }
				{ userChoice === "2" && <Visited/> }
				{ userChoice === "3" && <Liked/> && <Visited/> }
			</SubSawContainer>
		</SawContainer>
	);
}

export default Saw;