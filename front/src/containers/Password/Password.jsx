import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { styled as styledMaterial } from '@material-ui/core/styles';

import api from '../../api/api'
import { device, color } from '../../config/style';

import { useSnackbar } from 'notistack';
import { Typography, TextField, Button } from '@material-ui/core';

const PasswordContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	width: 100vw;
	color: white;
	background-image: linear-gradient(90deg, #FF655B 30%, #FF5864 90%);
	@media ${device.laptop} {
		flex-direction: row;
		background-image: linear-gradient(90deg, #FFF 30%, #FFF 90%);
	}
`

const PasswordTitle = styledMaterial(Typography)({
	fontSize: "2rem",
	marginTop: "10vh",
});

const PasswordForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-width: 50vw;
	margin-top: 15vh;
`

const PasswordInput = styledMaterial(TextField)({
	fontSize: '2rem',
	color: '#OOB7FF'
});

const LoginLink = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	@media ${device.mobileS} {
	margin-top: 40vh;
	}
	@media ${device.mobileL} {
		margin-top: 55vh;
	}
`

function Password() {
	const history = useHistory();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handlePassword = (e) => {setPassword(e.target.value);}
	const handleConfirmPassword = (e) => {setConfirmPassword(e.target.value);}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
				const request = {
					password: password
				};
				api.post('/user/editPassword', request)
				.then((res) => {
					enqueueSnackbar(`Password changed`, {variant: 'success'});
					console.log("password = ", password);
			    history.push("/");
			})
			.catch((err) => {
				enqueueSnackbar(`${err.response.data.message}`, {variant: 'error'});
			})
		}
	}

	return (
		<PasswordContainer>
			<PasswordTitle>Change password</PasswordTitle>	
			<PasswordForm noValidate autoComplete="off" onSubmit={handleSubmit}>
				<PasswordInput variant="outlined" label="password" name="password" onChange={handlePassword}/>
				<PasswordInput variant="outlined" label="confirmPassword" name="confirmPassword" onChange={handleConfirmPassword} style={{marginTop: "2vh"}}/>
				<Button color="secondary" style={{marginTop: "2vh"}} type='submit'>submit</Button>
			</PasswordForm>
			<LoginLink>
				<Typography>You've miss clicked?</Typography>
				<Button color="secondary"><Link to="/login">login</Link></Button>
			</LoginLink>
		</PasswordContainer>
	);
}

export default Password;
