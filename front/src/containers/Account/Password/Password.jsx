import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from "styled-components";

import api from '../../../api/api'
import { COLORS, device } from '../../../config/style'
import { useSnackbar } from 'notistack';

import { Typography, TextField, Button } from '@material-ui/core';

const PasswordForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const InputWrapper = styled.input`
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

function Password() {
	const history = useHistory();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [oldPassword, setOldPassword] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	
	const handleOldPassword = (e) => {setOldPassword(e.target.value);}
	const handlePassword = (e) => {setPassword(e.target.value);}
	const handleConfirmPassword = (e) => {setConfirmPassword(e.target.value);}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const request = {
				new_password: password,
				old_password: oldPassword
			};
			api.post('/user/editPassword', request)
			.then((res) => {
				enqueueSnackbar(`Password changed`, {variant: 'success'});
				setTimeout(closeSnackbar, 1000)
				// console.log("password = ", password);
		    	history.push("/");
			})
			.catch((err) => {
				enqueueSnackbar(`${err.response.data.message}`, {variant: 'error'});
				setTimeout(closeSnackbar, 1000)
			})
		}
	}

	return (
		<PasswordForm noValidate autoComplete="off" onSubmit={handleSubmit}>
			<InputWrapper placeholder="password" label="oldpassword" value={ oldPassword ? oldPassword : "" } name="password" onChange={handleOldPassword}/>
			<InputWrapper placeholder="new passord" label="password" value={ password ? password : "" } name="password" onChange={handlePassword}/>
			<InputWrapper placeholder="confirm new password" label="confirmpassword" value={ confirmPassword ? confirmPassword : "" } name="password" onChange={handleConfirmPassword}/>
			<SubmitButton type='submit'>Edit Password</SubmitButton>
		</PasswordForm>
	);	
}

export default Password;
