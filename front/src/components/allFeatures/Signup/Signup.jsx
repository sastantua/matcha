import React from 'react';
import { Link } from 'react-router-dom';

import './Signup.css';
import snail from '../../../media/snail.jpg';

import styled from "styled-components"

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
	width: '12rem',
	height: '5rem',
});

const InputSubWrapper = styled.div
`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

function Signup() {
	const classes = useStyles();

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
						<form id="credentials-form" className={classes.root} noValidate autoComplete="off">
							<div id="style-form">
								<InputSubWrapper>
									<InputWrapper id="outlined-basic" label="name" variant="outlined" />
									<InputWrapper id="outlined-basic" label="surname" variant="outlined" />
									<InputWrapper id="outlined-basic" label="username" variant="outlined" />
								</InputSubWrapper>
								<InputSubWrapper id="margin-selector">
									<InputWrapper id="outlined-basic" label="email" variant="outlined" />
									<InputWrapper id="outlined-basic" label="password" variant="outlined" />
									<InputWrapper id="outlined-basic" label="confirm password" variant="outlined" />
								</InputSubWrapper>
							</div>
							<Button color="secondary" >submit</Button>
						</form>
						<div id="redirect-signup">
							<p>Don't have an account?</p>
							<Button color="secondary" >
								<Link to="/login" >
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


export default Signup;