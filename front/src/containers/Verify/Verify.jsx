import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import styled from "styled-components";

import api from '../../api/api'


const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	background-image: linear-gradient(90deg, #FF655B 30%, #FF5864 90%);
`

function Verify() {
	let { token } = useParams();
	const history = useHistory();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("token = ", token)
		api.post(`/user/verify/${token}`)
		.then((res) => {
			enqueueSnackbar(`Account activated`, {variant: 'success'});
			setTimeout(closeSnackbar(), 1000)
			history.push("/login");
		})
		.catch((err) => {
			enqueueSnackbar(`${err.response.data.message}`, {variant: 'error'});
		})
	}

	return (
		<LoginContainer>
			<button onClick={handleSubmit}>Activate</button>
		</LoginContainer>
	);
}

export default Verify;