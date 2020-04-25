import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import styled from "styled-components";

import api from '../../api/api'
import { COLORS, BREAK_POINTS } from '../../config/style'

const SignupContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
`

const SignupTitle = styled.p`
	font-size: 2rem;
	margin-top: auto;
`

const SignupForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: auto;
	max-width: 50vw;
	& * {
		margin-top: 2vh;
	};
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

const SubmitButton = styled.button`
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

const LoginLink = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: auto;
	margin-bottom: 2vh;
`

const LoginText = styled.p`
	font-size: 1rem;
`

const LoginButton = styled.button`
	color: ${COLORS.WHITE};
	background-color: ${COLORS.PINK_FLASHY};
	padding: 5px 10px;
	margin: 0 8px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	:hover {
		transform: scale(1.05);
	}
`



function Signup() {
	const history = useHistory();

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirm_password, setConfirmPassword] = useState(null);
	const [username, setUsername] = useState(null);
	const [firstname, setFirstname] = useState(null);
	const [lastname, setLastname] = useState(null);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleEmail = (e) => {setEmail(e.target.value);}
	const handlePassword = (e) => {setPassword(e.target.value);}
	const handleConfirmPassword = (e) => {setConfirmPassword(e.target.value);}
	const handleUsername = (e) => {setUsername(e.target.value);}
	const handleFirstname = (e) => {setFirstname(e.target.value);}
	const handleLastname = (e) => {setLastname(e.target.value);}
	closeSnackbar();
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirm_password)
			return console.log('fail');
		const user = {
			email: email,
			password: password,
			username: username,
			firstname: firstname,
			lastname: lastname
		}
		api.post('/user/register', user)
		.then((res) => {
			enqueueSnackbar(`Welcome ${username}\ngo login`, {variant: 'success'});
			history.push("/login");
		})
		.catch((err) => {
			(err && err.response && err.response.message) ? enqueueSnackbar(`${err.response.message}`,  {variant: 'error'}) : enqueueSnackbar(`error`,  {variant: 'error'});				
		})
	}

	return (
		<SignupContainer>
			<SignupTitle>Matcha</SignupTitle>	
			<SignupForm noValidate autoComplete="off" onSubmit={handleSubmit}>
				<StyledInput placeholder="firstname" label="firstname" name="firstname" onChange={handleFirstname} variant="outlined" />
				<StyledInput placeholder="lastname" label="lastname" name="lastname" onChange={handleLastname} variant="outlined" />
				<StyledInput placeholder="username" label="username" name="username" onChange={handleUsername} variant="outlined" />
				<StyledInput placeholder="email" label="email" name="email" onChange={handleEmail} variant="outlined" />
				<StyledInput placeholder="password" label="password" name="password" onChange={handlePassword} variant="outlined" />
				<StyledInput placeholder="confirm password" label="confirm_password" name="confirm_password" onChange={handleConfirmPassword} variant="outlined" />
				<SubmitButton type='submit'>submit</SubmitButton>
			</SignupForm>
			<LoginLink>
				<LoginText>Already have an account?</LoginText>
				<LoginButton><Link to="/login" style={{color: "#FFF", textDecoration: "none"}}>login</Link></LoginButton>
			</LoginLink>
		</SignupContainer>
	);
}

export default Signup;