import styled from 'styled-components'
import {Typography, TextField, styled as styledMaterial } from '@material-ui/core';

const TitleWrapper = styledMaterial(Typography)({
	fontSize: '2rem',
});

const TextWrapper = styledMaterial(Typography)({
	fontSize: '1rem',
	color: "#FFF"
});

const InputWrapper = styledMaterial(TextField)({
	fontSize: '2rem',
	width: '20rem',
	color: '#OOB7FF'
});

const InputWrapperSmall = styledMaterial(TextField)({
	fontSize: '0.5rem',
	color: '#F0F'
});

const InputSubWrapper = styled.div
`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export { TitleWrapper, TextWrapper, InputWrapper, InputWrapperSmall, InputSubWrapper }