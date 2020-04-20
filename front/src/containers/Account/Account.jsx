import React, { useState, useContext } from 'react';
import styled from "styled-components";
import { UserContext } from '../../context/UserContext';

import api from '../../api/api'
import { COLORS } from '../../config/style'

import UserImages from './UserImages/UserImages'
import Gender from './Gender/Gender'
import Orientation from './Orientation/Orientation'
import Hobby from './Hobby/Hobby'
import Password from './Password/Password'

const AccountContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	width: 100%;
	/* max-width: 100vw; */
	/* padding: 0 10vw; */
	/* background-color: ${COLORS.WHITE}; */
`

const SubAccountContainer = styled.div`
	width: 80%;
	height: 80%;
`

const Teeest = styled.div`
	width: 20%;
	height: auto;
`

const UserForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 2vh;
	& > * {
		margin-top: 2vh;
	}
`

const StyledInput = styled.input`
	display: inline-block;
	width: 100%;
	margin: 8px 0;
	padding: 12px 20px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
`

const StyledTextarea = styled.textarea`
	display: inline-block;
	width: 100%;
	margin: 8px 0;
	padding: 12px 20px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
	resize: none;
`

const StyleButton = styled.button`
	width: 100%;
	color: ${COLORS.WHITE};
	background-color: ${COLORS.PINK_FLASHY};
	padding: 14px 20px;
	margin: 8px 0;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	:hover {
		transform: scale(1.05);
	}
`

function Account() {
	const { user, setUser } = useContext(UserContext);

	const [openGender, setOpenGender] = useState(false);
	const [openOrientation, setOpenOrientation] = useState(false);	
	const [openHobby, setOpenHobby] = useState(false);

	const dropdowns = {
		openGender: openGender,
		setOpenGender: setOpenGender,
		openOrientation: openOrientation,
		setOpenOrientation : setOpenOrientation,
		openHobby: openHobby,
		setOpenHobby: setOpenHobby,	
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		api.post('/user/edit', user)
		.then((res) => {console.log(res);})
		.catch((err) => {console.log(err);})
	}

	const handleEmail = (e) => {setUser({...user, email: e.target.value});}
	const handleUsername = (e) => {setUser({...user, username: e.target.value});}
	const handleFirstname = (e) => {setUser({...user, firstname: e.target.value});}
	const handleLastname = (e) => {setUser({...user, lastname: e.target.value});}
	const handleBirthdate = (e) => {setUser({...user, birthdate: e.target.value});}
	const handleBiography = (e) => {setUser({...user, biography: e.target.value});}

	return (
		<AccountContainer>
			<SubAccountContainer>
				<Teeest>
					<UserImages />
				</Teeest>
				<UserForm noValidate autoComplete="off" onSubmit={handleSubmit}>
					<StyledInput type="text" placeholder="email" label="email" value={ user && user.email ? user && user.email : "" } name="email" onChange={handleEmail}/>
					<StyledInput type="text" placeholder="username" label="username" value={ user && user.username ? user && user.username : "" } name="username" onChange={handleUsername}/>
					<StyledInput type="text" placeholder="firstname" label="firstname" value={ user && user.firstname ? user && user.firstname : "" } name="firstname" onChange={handleFirstname}/>
					<StyledInput type="text" placeholder="lastname" label="lastname" value={ user && user.lastname ? user && user.lastname : "" } name="lastname" onChange={handleLastname}/>
					<StyledInput type="date" placeholder="birthdate" label="birthdate" value={ user && user.birthdate ? user && user.birthdate : "" } name="birthdate" onChange={handleBirthdate}/>
					<StyledTextarea placeholder="biography" label="biography" value={ user && user.biography ? user && user.biography : "" } name="biography" onChange={handleBiography}/>
					<Gender user={user} dropdowns={dropdowns} />
					<Orientation user={user} dropdowns={dropdowns}/>
					<Hobby dropdowns={dropdowns}/>
					<StyleButton>Save changes</StyleButton>
				</UserForm>
				<Password/>
			</SubAccountContainer>
		</AccountContainer>
	);
}

export default Account;