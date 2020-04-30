import React, { useContext } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getPreciseDistance } from 'geolib';


import findAge from './findAge'
import UserImages from './UserImages';
import { UserContext } from '../context/UserContext';
import { COLORS, SPACING, BREAK_POINTS } from '../config/style';

const UserCardContainer = styled.div`
	width: auto;
	min-height: 60%;
	border-radius: 15px;
	padding: ${SPACING.BASE};
	background-image: linear-gradient(90deg, ${COLORS.ORANGE_GRADIENT} 30%, ${COLORS.PINK_GRADIENT} 90%);
	box-shadow: 0px 0px 31px -5px rgba(0,0,0,0.75);
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		display: flex;
		flex-direction: column;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		padding: ${SPACING.XS};
	}
`

const HeadContainer = styled.div`
	display: flex;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: row;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: column;
		align-items: center;
	}
`

const ImagesContainer = styled.div`
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: 50%;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: 100%;
	}

`

const Infos = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: row;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: column;
		margin-top: ${SPACING.XS}
	}
`

const NameContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: ${SPACING.BASE};
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: auto;
		margin-left: ${SPACING.XS};
	}
`

const RowContainer = styled.div`
	display: flex;
	flex-direction: row;
	& > :nth-child(n+2) {
		margin-left: ${SPACING.XXS}
	}
`

const Text = styled.span`
	color: ${COLORS.BLACK};
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 400;
		font-size: 1.4em;
		width: auto;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 300;
		font-size: 0.8em;
	}
`

const ChipsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: ${SPACING.BASE} 0;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: row;
		margin: ${SPACING.XS} 0;
	}
`

const Chip = styled.div`
	display: flex;
	align-items: center;
	color: white;
	background-color: ${COLORS.PURPLE};
	margin: ${SPACING.XXS};
	padding: ${SPACING.XXS} ${SPACING.XXS};
	font-weight: 300;
	border-radius: 32px;
`

const Icon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: ${COLORS.PINK_FLASHY};
	opacity: .7;
	box-shadow: 0px 0px 102px -20px rgba(0,0,0,0.75);
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		&& {
			height: 12px;
			width: 12px;
		}
		margin-right: ${SPACING.XXS};
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		&& {
			height: 28px;
			width: 28px;
		}
		margin-right: ${SPACING.XS};
	}
`

const Biography = styled.span`
	display: flex;
	justify-content: stretch;
	min-height: 50px;
	padding: ${SPACING.XXS} ${SPACING.XXS};
	border-radius: 15px;
	background-color: ${COLORS.GREY_LIGHT};
`

const Bottom = styled.div`
	margin-top: ${SPACING.BASE};
	display: flex;
	justify-content: space-evenly;
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		flex-direction: column;
		align-items: center;
	}
`
const Box = styled.div`
	padding: ${SPACING.XS} ${SPACING.XS};
	background-color: ${COLORS.GREY_LIGHT};
	border-radius: 32px;
`



function UserCard(props) {
	const { user } = useContext(UserContext);
	
	const getDistance = (user_a, user_b) => {
		return getPreciseDistance({latitude: user_a.location.lat, longitude: user_a.location.lng}, {latitude: user_b.location.lat, longitude: user_b.location.lng}) * 0.001;
	}

	if (props)
		var distance = getDistance(props.user, user).toString().split('.')[0];
	
		return (
		<UserCardContainer id={props.user.username}>
			<Link to={{pathname: '/profile', state: { user: props.user }}} style={{ textDecoration: 'none' }}>
				<HeadContainer id="HeadContainer">
					<ImagesContainer id="ImagesContainer">
						<UserImages match={props.user} id="UserImages"/>
					</ImagesContainer>
					<Infos id="Infos">
						<NameContainer id="NameContainer">
							<Text>{`@${props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)}`}</Text>
							<Text>{`${props.user.firstname.charAt(0).toUpperCase() + props.user.firstname.slice(1)} ${props.user.lastname.charAt(0).toUpperCase() + props.user.lastname.slice(1)}`}</Text>
							<RowContainer id="RowContainer">
								<Text>{props.user.gender.name.charAt(0).toUpperCase() + props.user.gender.name.slice(1)}</Text>
								<Text>{props.user.orientation.name.charAt(0).toUpperCase() + props.user.orientation.name.slice(1)}</Text>
								<Text>{`${findAge(props.user.birthdate)} Yo`}</Text>
							</RowContainer>
							<Text>Distance: {distance} km</Text>
							<Text>Populairty score: {props.user.popularity}</Text>
						</NameContainer>
					</Infos>
				</HeadContainer>
				<ChipsContainer id="ChipsContainer">
					{
						props.user.hobbies.map(hobby =>
							<Chip id="Chip">
								<Icon className="fab fa-slack-hash">
								</Icon>
								<span>{hobby.name}</span>
							</Chip>
						)
					}
				</ChipsContainer>
				<Biography id="Biography">
					{`${props.user.biography}`}
				</Biography>
				<Bottom id="Bottom">
					{props.user.likes && <Box>{"has liked you"}</Box>}
					{props.user.isSeen && <Box>{"has seen your profile"}</Box>}
				</Bottom>
			</Link>
		</UserCardContainer>
	);
}

export default UserCard;