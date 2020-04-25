import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import findAge from '../../../helper/findAge'
import UserImages from '../../../helper/UserImages/UserImages';
import { COLORS, SPACING, BREAK_POINTS } from '../../../config/style';

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
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
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

const GenderOrientationAgeContainer = styled.div`
	display: flex;
	flex-direction: row;
	& > :nth-child(n+2) {
		margin-left: ${SPACING.XXS}
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: auto;
	}
`

const Text = styled.span`
	color: ${COLORS.BLACK};
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

const RowContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
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
		height: 12px;
		width: 12px;
		margin-right: ${SPACING.XXS};
	}
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		height: 28px;
		width: 28px;
		margin-right: ${SPACING.XS};
	}
`

const Chip = styled.div`
	display: flex;
	align-items: center;
	color: white;
	background-color: ${COLORS.PURPLE};
	margin: ${SPACING.XXS};
	padding: ${SPACING.XXS} ${SPACING.XXS};
	font-size: 0.5em;
	font-weight: 300;
	border-radius: 32px;
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
	padding: ${SPACING.XXS} ${SPACING.XXS};
	background-color: ${COLORS.GREY};
	border-radius: 32px;
`

function User(props) {
	return (
		<UserContainer id={props.user.username}>
			<Link to={{pathname: '/profile', state: { user: props.user }}} style={{ textDecoration: 'none' }}>
				<HeadContainer id="HeadContainer">
					<ImagesContainer id="ImagesContainer">
						<UserImages match={props.user} id="UserImages"/>
					</ImagesContainer>
					<Infos id="Infos">
						<NameContainer id="NameContainer">
							<Text>{`@${props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)}`}</Text>
							<Text>{`${props.user.firstname.charAt(0).toUpperCase() + props.user.firstname.slice(1)} ${props.user.lastname.charAt(0).toUpperCase() + props.user.lastname.slice(1)}`}</Text>
							<GenderOrientationAgeContainer id="GenderOrientationAgeContainer">
								<Text>{props.user.gender.name.charAt(0).toUpperCase() + props.user.gender.name.slice(1)}</Text>
								<Text>{props.user.orientation.name.charAt(0).toUpperCase() + props.user.orientation.name.slice(1)}</Text>
								<Text>{`${findAge(props.user.birthdate)} Yo`}</Text>
							</GenderOrientationAgeContainer>
						</NameContainer>
					</Infos>
				</HeadContainer>
				<RowContainer id="RowContainer">
					<ChipsContainer id="ChipsContainer">
					{
						props.user.hobbies.map(hobby =>
							<Chip id="Chip">
								<Icon>
									<i class="fab fa-slack-hash"></i>
								</Icon>
								<span>{hobby.name}</span>
							</Chip>
						)
					}
					</ChipsContainer>
				</RowContainer>
				<Biography id="Biography">
					{`${props.user.biography}`}
				</Biography>
				<Bottom id="Bottom">
					{props.user.likes && <Box>{"Already likes you"}</Box>}
					{props.user.isSeen && <Box>{"Already saw your profile"}</Box>}
				</Bottom>
			</Link>
		</UserContainer>
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