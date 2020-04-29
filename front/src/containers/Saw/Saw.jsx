import React, {useState, useEffect} from 'react';
import styled from 'styled-components'

import api from '../../api/api';
import UserCard from '../../helper/UserCard';
import { BREAK_POINTS } from '../../config/style'
import LonelyCat from '../../media/lonelycat.png'

import Checkbox from './Checkbox';

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
	const [liked, setLiked] = useState(true);
	const [visited, setVisited] = useState(false);
	const [likeResult, setLikeResult] = useState([]);
	const [visitedResult, setVisitedResult] = useState([]);

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
		likeResult.length > 0 && likeResult.map((user, index) => {
			return <UserCard user={likeResult[index].user} key={index}/>
		})
		return <img src={LonelyCat} alt=""/>
	}

	const Visited = () => {
		let returnJsx = null;
		if (visited) {
			returnJsx = visitedResult.length > 0 && visitedResult.map((user, index) => {
				return <UserCard user={visitedResult[index].user} key={index}/>
			})
		}
		else {
			returnJsx = () => {
				return <img src={LonelyCat} alt=""/>
			}
		}
		return returnJsx;
	}

	return (
		<SawContainer id="SawContainer">
			<SubSawContainer id="SubSawContainer">
				<Checkbox liked={liked} setLiked={setLiked} visited={visited} setVisited={setVisited}/>
				{ liked && <Liked/> }
				{ visited && <Visited/> }
			</SubSawContainer>
		</SawContainer>
	);
}

export default Saw;