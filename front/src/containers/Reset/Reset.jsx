import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';

import api from '../../api/api'
import { COLORS, BREAK_POINTS } from '../../config/style'

const ResetContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
`

const ResetTitle = styled.p`
	font-size: 2rem;
	margin-top: 10vh;
`

const ResetForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: auto;
	@media only screen and (min-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: 30%;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		width: auto;
	}
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

const LoginLink = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: auto;
	margin-bottom: 2vh;
`

const LoginText = styled.p`
	font-size: 1rem;
`

const LoginButton = styled.button`
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

function Reset() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleEmail = (e) => {setEmail(e.target.value);}

	const handleSubmit = (e) => {
		e.preventDefault();
		api.post('/user/forgot', {email: email})
		.then((res) => {
			enqueueSnackbar(`Check you mails`, {variant: 'success'});
			setTimeout(closeSnackbar(), 1000)
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
				<StyledInput placeholder="email" label="email" name="email" onChange={handleEmail}/>
				<SubmitButton type='submit'>submit</SubmitButton>
			</ResetForm>
			<LoginLink>
				<LoginText>You've miss clicked?</LoginText>
				<LoginButton><Link to="/login" style={{color: "#FFF", textDecoration: "none"}}>login</Link></LoginButton>
			</LoginLink>
		</ResetContainer>
	);
}

export default Reset;
