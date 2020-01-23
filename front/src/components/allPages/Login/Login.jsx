import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import qs from 'querystring';
import { useSnackbar } from 'notistack';

import './Login.css';
// import styled from "styled-components";
import snail from '../../../media/snail.jpg';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { makeStyles, styled as styledMaterial } from '@material-ui/core/styles';

import api from '../../../api'

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: 200,
		},
	},
}));

const TitleWrapper = styledMaterial(Typography)({
	fontSize: '2rem',
});

const InputWrapper = styledMaterial(TextField)({
	fontSize: '2rem',
	width: '20rem',
});

// const Test = styled.div`
// 	background-color: black;
// 	height: 1000px;
// 	width: auto;
// `
// const TestMod = styled(Test)`
// 	background-color: ${props => props.color};
// `

function Login() {
	const classes = useStyles();
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleEmail = (e) => {
		setEmail(e.target.value);
	}

	const handlePassword = (e) => {
		setPassword(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = {
			email: email,
			password: password
		}
		const queryString = qs.stringify(user)
		api.post('/user/login', queryString)
		.then((res) => {
			console.log(res);
			localStorage.token = res.data.token;
			enqueueSnackbar('I love hooks');
		})
		.catch((err) => {
			console.log(err);
		})
	}

	return (
		<div id="login-component">
			<div id="login-container">
				<div id="login-left">
					<img src={snail} alt=""/>
				</div>
				<div id="login-right">
					<div id="login-right-top">
						<TitleWrapper component='h1'>
							Matcha
						</TitleWrapper>	
					</div>
					<div id="login-right-bottom">
						<form id="credentials-form" className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
							<InputWrapper variant="outlined" label="email" name="email" onChange={handleEmail}/>
							<InputWrapper variant="outlined" label="password" name="password" onChange={handlePassword}/>
							<Button color="secondary" type='submit'>submit</Button>
						</form>
						<div id="redirect-login">
							<p>Don't have an account?</p>
							<Button color="secondary" >
								<Link to="/signup" >
									sign up
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;