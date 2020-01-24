import {Typography, TextField, styled as styledMaterial } from '@material-ui/core';

const TitleWrapper = styledMaterial(Typography)({
	fontSize: '2rem',
});

const InputWrapper = styledMaterial(TextField)({
	fontSize: '2rem',
	width: '20rem',
});

export { TitleWrapper, InputWrapper }