import React from 'react';
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
			<StyledButton onClick={handleSubmit}>Activate your account</StyledButton>
		</LoginContainer>
	);
}

export default Verify;