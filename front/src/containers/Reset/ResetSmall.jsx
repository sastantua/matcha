import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { styled as styledMaterial } from '@material-ui/core/styles';

import api from '../../api/api'

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
`

const ResetTitle = styledMaterial(Typography)({
	fontSize: "2rem",
	marginTop: "10vh",
});

const ResetForm = styled.form`
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

const MailInput = styledMaterial(TextField)({
	fontSize: '2rem',
	color: '#OOB7FF'
});


function ResetSmall() {
	const history = useHistory();
	const [email, setEmail] = useState("test@test.com");
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleEmail = (e) => {setEmail(e.target.value);}

	const handleSubmit = (e) => {
		e.preventDefault();
		// const user = {email: email}
		api.post('/user/reset', {email: email})
		.then((res) => {
			api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
			enqueueSnackbar(`Check you mails`, {variant: 'success'});
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
				<Button color="secondary" type='submit'>submit</Button>
			</ResetForm>

		</ResetContainer>
	);
}

export default ResetSmall;
