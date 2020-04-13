import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import styled from "styled-components";
import { styled as styledMaterial } from '@material-ui/core/styles';

import api from '../../api/api'

import { Typography, TextField, Button } from '@material-ui/core';

const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	width: 100vw;
	color: white;
	background-image: linear-gradient(90deg, #FF655B 30%, #FF5864 90%);
`

const LoginTitle = styledMaterial(Typography)({
	fontSize: "2rem",
	marginTop: "10vh",
});

const LoginForm = styled.form`
	& * {
		margin-top: 2vh;
	},
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-width: 50vw;
	margin-top: 15vh;
`

const InputWrapper = styledMaterial(TextField)({
	fontSize: '2rem',
	color: '#OOB7FF'
});

const SignupLink = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 20vh;
`

const ResetPasswordLink = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

function LoginSmall() {
	const history = useHistory();
	const [email, setEmail] = useState("guillaumeroux123@gmail.com");
	const [password, setPassword] = useState("Guillaume-123");
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleEmail = (e) => {setEmail(e.target.value);}
	const handlePassword = (e) => {setPassword(e.target.value);}
	closeSnackbar();

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = {
			email: email,
			password: password
		}
		api.post('/user/login', user)
		.then((res) => {
			localStorage.token = res.data.token;
			api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
			enqueueSnackbar(`Welcome ${res.data.user.username}`, {variant: 'success'});
		    history.push("/");
		})
		.catch((err) => {
			enqueueSnackbar(`${err.response.data.message}`, {variant: 'error'});
		})
	}

	return (
		<LoginContainer>
			<LoginTitle>Matcha</LoginTitle>	
			<LoginForm noValidate autoComplete="off" onSubmit={handleSubmit}>
				<InputWrapper variant="outlined" label="email" name="email" onChange={handleEmail}/>
				<InputWrapper variant="outlined" label="password" name="password" onChange={handlePassword}/>
				<Button color="secondary" type='submit'>submit</Button>
			</LoginForm>
			<SignupLink>
				<Typography>Don't have an account?</Typography>
				<Button color="secondary"><Link to="/signup">sign up</Link></Button>
			</SignupLink>
			<ResetPasswordLink>
				<Typography>Forgot your password?</Typography>
				<Button color="secondary"><Link to="/reset">reset</Link></Button>
			</ResetPasswordLink>
		</LoginContainer>
	);
}

export default LoginSmall;