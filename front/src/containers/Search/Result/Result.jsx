import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core/styles';

import api from '../../../api/api'
import { Favorite as FavoriteIcon, Cancel as CancelIcon, Block as BlockIcon, Replay as ReplayIcon } from '@material-ui/icons';
import { Typography, Paper } from '@material-ui/core'
import findAge from '../Helper/findAge.js'
import { notifSocket } from '../../../api/socket';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

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

const InfoContainer = styled.div`
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
	marginTop: '2vh',
});

const Info = styledMaterial(Typography)({
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

const ActionContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 1.5em;
	margin-bottom: 1em;
`

function User(props) {
	const { user } = useContext(UserContext);
	const [like, setLike] = useState(false);
	const [block, setBlock] = useState(false);

	const likeMatch = () => {
		api.post(`/user/like/${props.user._id}`)
		.then((res) => {setLike(true)})
		.catch((err) => {console.log(err)})
		notifSocket.emit('notification', {
			type: 'like',
			to: props.user._id,
			from: user._id
		})
	}

	const unlikeMatch = () => {
		api.post(`/user/unlike/${props.user._id}`)
		.then((res) => {setLike(false)})
		.catch((err) => {console.log(err)})
	}

	const blockMatch = () => {
		api.post(`/user/block/${props.user._id}`)
		.then((res) => {setBlock(true)})
		.catch((err) => {console.log(err)})
	}

	const unblockMatch = () => {
		api.post(`/user/unblock/${props.user._id}`)
		.then((res) => {setBlock(false)})
		.catch((err) => {console.log(err)})
	}

	let hobbiesArray = [];
	
	if (props.user.hobbies.length <= 5)
		hobbiesArray = props.user.hobbies; 
	else 
		hobbiesArray = props.user.hobbies.splice(5, props.user.hobbies.length);
	
	const userHobbies = hobbiesArray.map((hobby, index) => {
		if (index < hobbiesArray.length1)
			return ("#" + hobby.name + "")
		else
			return ("#" + hobby.name)
	})

	return (
		<UserContainer>
				<PaperContainer elevation={3} component="div">
					<Link to={{pathname: '/profile', state: { user: props.user }}} style={{ textDecoration: 'none' }}>
						<img src={props.user.pictures[0].url} alt={props.user.pictures[0].name} key={props.user.pictures[0].name} style={{width: '70vw'}}/>
						{/* <Username>@{props.user.username}</Username> */}
						<Name>{props.user.firstname} {props.user.lastname}</Name>
						<InfoContainer>
							<Info>{props.user.gender.name.charAt(0).toUpperCase() + props.user.gender.name.slice(1)}</Info>
							<Info style={{marginLeft: '2vw'}}>{findAge(props.user.birthdate)} years old</Info>
							<Info style={{marginLeft: '2vw'}}>{props.user.orientation.name}</Info>
						</InfoContainer>
						<Hobbies>Interested in {userHobbies}</Hobbies>
						<Biography>{props.user.biography}</Biography>
					</Link>
					<ActionContainer>
						{ like === false ? <FavoriteIcon onClick={likeMatch} htmlColor='#FAE3D9' /> : <CancelIcon onClick={unlikeMatch} htmlColor='#FAE3D9' />}
						{ block == false ? <BlockIcon onClick={blockMatch} style={{marginLeft: "1.5em"}}></BlockIcon> : <ReplayIcon onClick={unblockMatch} style={{marginLeft: "1.5em"}}></ReplayIcon>}
					</ActionContainer>
				</PaperContainer>
			</UserContainer>
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