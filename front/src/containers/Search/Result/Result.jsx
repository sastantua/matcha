import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import api from '../../../api/api'
import { notifSocket } from '../../../api/socket';
import { COLORS, SPACING, BREAK_POINTS } from '../../../config/style';
import { UserContext } from '../../../context/UserContext';
import findAge from '../../../helper/findAge'
import UserImages from '../../../helper/UserImages/UserImages';

// const UserContainer = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;
// `

// const PaperContainer = styled(Paper)({
// 	display: 'flex',
// 	flexDirection: 'column',
// 	backgroundColor: '#ff3860',
// 	paddingTop: '0.5em',
// 	paddingLeft: '0.5em',
// 	paddingRight: '0.5em',
// 	paddingBottom: '0.5em',
// 	maxWidth: '70vw',
// });

// const InfoContainer = styled.div`
// 	display: flex;
// 	flex-direction: row;
// 	align-items: flex-start;
// `

// const Username = styledMaterial(Typography)({
// 	fontSize: '1rem',
// 	color: "#FFF",
// 	marginTop: '2vh',
// });

// const Name = styledMaterial(Typography)({
// 	fontSize: '1rem',
// 	color: "#FFF",
// 	marginTop: '2vh',
// });

// const Info = styledMaterial(Typography)({
// 	fontSize: '0.7rem',
// 	color: "#FFF",
// });

// const Hobbies = styledMaterial(Typography)({
// 	fontSize: '0.7rem',
// 	color: "#FFF",
// 	marginBottom: '1vh',
// });

// const Biography = styledMaterial(Typography)({
// 	fontSize: '0.5rem',
// 	color: "#FFF",
// 	marginBottom: '1vh',
// });

// const ActionContainer = styled.div`
// 	display: flex;
// 	flex-direction: row;
// 	justify-content: center;
// 	align-items: center;
// 	margin-top: 1.5em;
// 	margin-bottom: 1em;
// `

const ResultContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	& > * {
		margin-top: 4vh;
	}
`

const UserContainer = styled.div`
	width: 50%;
	min-height: 60%;
	border-radius: 15px;
	padding: ${SPACING.BASE};
	background-color: ${COLORS.WHITE};
	box-shadow: 0px 0px 31px -5px rgba(0,0,0,0.75);
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
`

const HeadContainer = styled.div`
	display: flex;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		flex-direction: column;
		align-items: center;
	}
`

const ImagesContainer = styled.div`
	width: 40%;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		/* width: auto; */
	}
`

const Infos = styled.div`
	display: flex;
	margin-left: ${SPACING.BASE};
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		flex-direction: column;
		align-items: center;
	}
`

const NameContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		width: auto;
	}
`

const Text = styled.span`
	color: ${COLORS.BLACK};
	width: 50%;
	font-weight: 600;
	font-size: 1.3em;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) 	{
		width: auto;
	}
`
const Username = styled.span`
	color: ${COLORS.GREY};
`

const Age = styled.span`
	color: ${COLORS.BLACK};
	font-size: 1.6em;
	font-weight: 600;
`

const Biography = styled.span`
	display: flex;
	justify-content: stretch;
	min-height: 50px;
	padding: ${SPACING.XXS} ${SPACING.XS};
	border-radius: 15px;
	background-color: ${COLORS.GREY_LIGHT};
`;


function User(props) {
	const { user } = useContext(UserContext);
	const [like, setLike] = useState(props.user.liked);
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
		.then((res) => {
			document.getElementById(props.user.username).style.display = "none";
			setBlock(true)})
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
		<UserContainer id={props.user.username}>
			<Link to={{pathname: '/profile', state: { user: props.user }}} style={{ textDecoration: 'none' }}>
				<HeadContainer>
					<ImagesContainer>
						<UserImages match={props.user}/>
						{/* <img src={props.user.pictures[0].url} alt={props.user.pictures[0].name} key={props.user.pictures[0].name}/> */}
					</ImagesContainer>
					{/* <Infos>
						<NameContainer>
							<Text>{`${props.user.firstname} ${props.user.lastname}`}</Text>
							<Username>{`@${props.user.username}`}</Username>
						</NameContainer>
						<Text>{props.user.gender.name}</Text>
						<Text>{props.user.orientation.name}</Text>
						<Text>{`${findAge(props.user.birthdate)} Yo`}</Text>
					</Infos> */}
				</HeadContainer>
			</Link>
		</UserContainer>

		// <UserContainer id={props.user.username}>
		// 	<PaperContainer elevation={3} component="div">
		// 		<Link to={{pathname: '/profile', state: { user: props.user }}} style={{ textDecoration: 'none' }}>
		// 			<img src={props.user.pictures[0].url} alt={props.user.pictures[0].name} key={props.user.pictures[0].name} style={{width: '70vw'}}/>
		// 			<Name>{props.user.firstname} {props.user.lastname}</Name>
		// 			<InfoContainer>
		// 				<Info>{props.user.gender.name.charAt(0).toUpperCase() + props.user.gender.name.slice(1)}</Info>
		// 				<Info style={{marginLeft: '2vw'}}>{findAge(props.user.birthdate)} years old</Info>
		// 				<Info style={{marginLeft: '2vw'}}>{props.user.orientation.name}</Info>
		// 			</InfoContainer>
		// 			<Hobbies>Interested in {userHobbies}</Hobbies>
		// 			<Biography>{props.user.biography}</Biography>
		// 		</Link>
		// 		<ActionContainer>
		// 			{ like === false ? <FavoriteIcon onClick={likeMatch} htmlColor='#FAE3D9' /> : <CancelIcon onClick={unlikeMatch} htmlColor='#FAE3D9' />}
		// 			{ block === false ? <BlockIcon onClick={blockMatch} style={{marginLeft: "1.5em"}}></BlockIcon> : <ReplayIcon onClick={unblockMatch} style={{marginLeft: "1.5em"}}></ReplayIcon>}
		// 		</ActionContainer>
		// 	</PaperContainer>
		// </UserContainer>
	);
}

function Result(props) {
	const Users = () => {
		return (
			props.result.map((user, index) => {
				return (<User user={user} key={index}/>);
			}
		));
	}

	return (
		<ResultContainer id="ResultContainer">
			<Users/>
		</ResultContainer>
	);
}

export default Result;