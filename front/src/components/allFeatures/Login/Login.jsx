import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';
import snail from '../../../media/snail.jpg';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { makeStyles, styled as styledMaterial } from '@material-ui/core/styles';

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
	marginTop: '1em',
	marginBottom: '0.5em',
});

const InputWrapper = styledMaterial(TextField)({
	fontSize: '2rem',
	width: '20rem',
	height: '3rem',
});

function Login() {
	const classes = useStyles();

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
						<form id="credentials-form" className={classes.root} noValidate autoComplete="off">
							<InputWrapper id="outlined-basic" label="name" variant="outlined" />
							<InputWrapper id="outlined-basic" label="surname" variant="outlined" />
							<InputWrapper id="outlined-basic" label="email" variant="outlined" />
							<InputWrapper id="outlined-basic" label="username" variant="outlined" />
							<InputWrapper id="outlined-basic" label="password" variant="outlined" />
							<Button color="secondary" >submit</Button>
						</form>
						<div id="redirect-login">
							<p>Don't have an account?</p>
							<Button color="secondary" >
								<Link to="/signup" >
									sign in
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