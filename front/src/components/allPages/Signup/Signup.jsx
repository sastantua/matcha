import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Button } from '@material-ui/core';

import './Signup.css';
import { TitleWrapper, InputWrapper, InputSubWrapper } from './Wrapper.jsx';
import snail from '../../../media/snail.jpg';
import useStyles from '../../../helper/useStyles'

import api from '../../../api'

function Signup() {
	const classes = useStyles();

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
		api.post('/user', user)
		.then((res) => {
			console.log(res);
			localStorage.token = res.data.token;
			enqueueSnackbar(`Welcome ${res.data.user.username}`, {variant: 'success'});
		})
		.catch((err) => {
			console.log(err.response);
			enqueueSnackbar(`${err.response.data.message}`,  {variant: 'error'});
		})
	}

	return (
		<div id="signup-component">
			<div id="signup-container">
				<div id="signup-left">
					<img src={snail} alt=""/>
				</div>
				<div id="signup-right">
					<div id="signup-right-top">
						<TitleWrapper component='h1'>
							Matcha
						</TitleWrapper>	
					</div>
					<div id="signup-right-bottom">
						<form id="credentials-form" className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
							<div id="style-form">
								<InputSubWrapper>
									<InputWrapper label="firstname" name="firstname" onChange={handleFirstname} variant="outlined" />
									<InputWrapper label="lastname" name="lastname" onChange={handleLastname} variant="outlined" />
									<InputWrapper label="username" name="username" onChange={handleUsername} variant="outlined" />
								</InputSubWrapper>
								<InputSubWrapper id="margin-selector">
									<InputWrapper label="email" name="email" onChange={handleEmail} variant="outlined" />
									<InputWrapper label="password" name="password" onChange={handlePassword} variant="outlined" />
									<InputWrapper label="confirm_password" name="confirm_password" onChange={handleConfirmPassword} variant="outlined" />
								</InputSubWrapper>
							</div>
							<Button type='submit' color="secondary" >submit</Button>
						</form>
						<div id="redirect-signup">
							<p>Already have an account?</p>
							<Button color="secondary" >
								<Link to="/login" >
									login
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;