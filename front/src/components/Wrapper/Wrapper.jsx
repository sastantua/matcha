import {Typography, TextField, styled as styledMaterial } from '@material-ui/core';

const TitleWrapper = styledMaterial(Typography)({
	fontSize: '2rem',
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

export { TitleWrapper, InputWrapper, InputWrapperSmall }