import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { styled as styledMaterial } from '@material-ui/core/styles';

import api from '../../api/api'
import { device, color } from '../../config/style';

import { useSnackbar } from 'notistack';
import { Typography, TextField, Button } from '@material-ui/core';

const ResetContainer = styled.div`
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

const ResetTitle = styledMaterial(Typography)({
	fontSize: "2rem",
	marginTop: "10vh",
});

const ResetForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-width: 50vw;
	margin-top: 15vh;
`

const MailInput = styledMaterial(TextField)({
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

function Reset() {
	const history = useHistory();
	const [email, setEmail] = useState("test@test.com");
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleEmail = (e) => {setEmail(e.target.value);}

	const handleSubmit = (e) => {
		e.preventDefault();
		// const user = {email: email}
		api.post('/user/forgot', {email: email})
		.then((res) => {
			enqueueSnackbar(`Check you mails`, {variant: 'success'});
			console.log("email = ", email);
		    history.push("/");
		})
		.catch((err) => {
			enqueueSnackbar(`${err.response.data.message}`, {variant: 'error'});
		})
	}

	return (
		<ResetContainer>
			<ResetTitle>Reset password</ResetTitle>	
			<ResetForm noValidate autoComplete="off" onSubmit={handleSubmit}>
				<MailInput variant="outlined" label="email" name="email" onChange={handleEmail}/>
				<Button color="secondary" style={{marginTop: "2vh"}} type='submit'>submit</Button>
			</ResetForm>
			<LoginLink>
				<Typography>You've miss clicked?</Typography>
				<Button color="secondary"><Link to="/login">login</Link></Button>
			</LoginLink>
		</ResetContainer>
	);
}

export default Reset;
