import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import styled from "styled-components";

import api from '../../api/api'
import { COLORS } from '../../config/style'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
`

const LoginTitle = styled.p`
	font-size: 2rem;
	margin-top: auto;
`

const LoginForm = styled.form`
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

const RedirectionContainer = styled.div`
	margin-top: auto;
`

const ResetPwdLink = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const ResetPwdText = styled.p`
	font-size: 1rem;
`

const ResetPwdButton = styled.button`
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

const SignupLink = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: auto;
	margin-bottom: 2vh;
`

const SignupText = styled.p`
	font-size: 1rem;
`

const SignupButton = styled.button`
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

function Login() {
	const history = useHistory();
	const [ user, setUser ] = useContext(UserContext);
	const [email, setEmail] = useState("guillaumeroux123@gmail.com");
	const [password, setPassword] = useState("Guillaume-1234");
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
			setUser(res.data.user);
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
				<StyledInput placeholder="email" label="email" name="email" onChange={handleEmail}/>
				<StyledInput placeholder="password" label="password" name="password" onChange={handlePassword} style={{marginTop: "1vh"}}/>
				<SubmitButton color="secondary" type='submit'>submit</SubmitButton>
			</LoginForm>
			<RedirectionContainer>
				<ResetPwdLink>
					<ResetPwdText>Forgot your password?</ResetPwdText>
					<ResetPwdButton><Link to="/reset" style={{color: "#FFF", textDecoration: "none"}}>reset</Link></ResetPwdButton>
				</ResetPwdLink>
				<SignupLink>
					<SignupText>Don't have an account?</SignupText>
					<SignupButton><Link to="/signup" style={{color: "#FFF", textDecoration: "none"}}>sign up</Link></SignupButton>
				</SignupLink>
			</RedirectionContainer>
		</LoginContainer>
	);
}

export default Login;