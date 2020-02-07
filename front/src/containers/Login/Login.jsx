import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import api from '../../api/api'

import { TitleWrapper, InputWrapper } from '../../components/Wrapper/Wrapper.jsx';
import snail from '../../media/snail.jpg';
import useStyles from '../../helper/useStyles'
import './Login.css';


function Login() {
	const classes = useStyles();
	const history = useHistory();
	const [email, setEmail] = useState("test@test.com");
	const [password, setPassword] = useState("test42");
	// const [userData, setUserData] = useState("test");
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
			// console.log(res);
			localStorage.token = res.data.token;
			api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
			enqueueSnackbar(`Welcome ${res.data.user.username}`, {variant: 'success'});
		    history.push("/");
		})
		.catch((err) => {
			enqueueSnackbar(`${err.response.data.message}`,  {variant: 'error'});
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
						<TitleWrapper component='h1'>Matcha</TitleWrapper>	
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
								<Link to="/signup" >sign up</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;