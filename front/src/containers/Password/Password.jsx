import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import styled from "styled-components";

import api from '../../api/api'
import { COLORS } from '../../config/style'


const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${COLORS.WHITE};
	background-color: ${COLORS.BLACK_LIGHT};
`

const StyledInput = styled.input`
	display: inline-block;
	margin: 8px 0;
	padding: 12px 20px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
`

const StyledButton = styled.button`
	color: ${COLORS.WHITE};
	background-color: ${COLORS.PINK_FLASHY};
	padding: 14px 20px;
	margin: 8px 0;
	margin-top: 2vh;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	:hover {
		transform: scale(1.05);
	}
`

function Password() {
	let { token } = useParams();
	const history = useHistory();
	const [password, setPassword] = useState("");
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	
	const handlePassword = (e) => {setPassword({password: e.target.value});}

	const handleSubmit = (e) => {
		e.preventDefault();
		let request = {"password": password, "token": token}
		api.post('/user/reset', request)
		.then((res) => {
			enqueueSnackbar(`Password changed`, {variant: 'success'});
			setTimeout(closeSnackbar(), 1000)
			history.push("/login");
		})
		.catch((err) => {
			enqueueSnackbar(`${err.response.data.message}`, {variant: 'error'});
		})
	}

	return (
		<LoginContainer>
			<StyledInput placeholder="password" label="password" name="password" onChange={handlePassword}/>
			<StyledButton onClick={handleSubmit}>Change your password</StyledButton>
		</LoginContainer>
	);
}

export default Password;