import React from 'react';
import Picture from '../../../components/Picture/Picture';
import styled from 'styled-components';
import { SPACING } from '../../../config';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100px;
	padding: ${SPACING.BASE};
`

const Typography = styled.h4`
	margin-left: ${SPACING.BASE};
`

export default ({ user, handleClick, messages }) => {
	const picture = user.pictures.filter(picture => picture.isPP)[0];
	return (
		<Wrapper onClick={(e) => handleClick(user)}>
			<Picture width={'70px'} src={picture.url} round={true}/>
			<Typography>{`${user.firstname} ${user.lastname}`}</Typography>
		</Wrapper>
	)
}