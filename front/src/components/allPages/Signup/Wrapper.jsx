import { Typography, TextField, styled as styledMaterial } from '@material-ui/core';
import styled from 'styled-components'

const TitleWrapper = styledMaterial(Typography)({
	fontSize: '2rem',
	marginTop: '1em',
	marginBottom: '0.5em',
});

const InputWrapper = styledMaterial(TextField)({
	fontSize: '2rem',
	width: '15rem',
	height: '5rem',
});

const InputSubWrapper = styled.div
`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export { TitleWrapper, InputWrapper, InputSubWrapper }