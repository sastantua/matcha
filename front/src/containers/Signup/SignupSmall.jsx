import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import styled from "styled-components";
import { styled as styledMaterial } from '@material-ui/core/styles';

import api from '../../api/api'

import { Typography, TextField, Button } from '@material-ui/core';

const SignupContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	color: white;
	background-image: linear-gradient(90deg, #FF655B 30%, #FF5864 90%);
`

const SignupTitle = styledMaterial(Typography)({
	fontSize: "2rem",
	marginTop: "10vh",
});

const SignupForm = styled.form`
	& * {
		margin-top: 2vh;
	},
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-width: 50vw;
	margin-top: 7vh;
`

const InputWrapper = styledMaterial(TextField)({
	fontSize: '2rem',
	color: '#OOB7FF'
});

const RedirectionSignup = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 20vh;
`

function SignupSmall() {
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
				<InputWrapper label="firstname" name="firstname" onChange={handleFirstname} variant="outlined" />
				<InputWrapper label="lastname" name="lastname" onChange={handleLastname} variant="outlined" />
				<InputWrapper label="username" name="username" onChange={handleUsername} variant="outlined" />
				<InputWrapper label="email" name="email" onChange={handleEmail} variant="outlined" />
				<InputWrapper label="password" name="password" onChange={handlePassword} variant="outlined" />
				<InputWrapper label="confirm_password" name="confirm_password" onChange={handleConfirmPassword} variant="outlined" />
				<Button color="secondary" type='submit'>submit</Button>
			</SignupForm>
			<RedirectionSignup>
				<Typography>Already have an account?</Typography>
				<Button color="secondary">
				<Link to="/login">login</Link>
				</Button>
			</RedirectionSignup>
		</SignupContainer>
	);
}

export default SignupSmall;