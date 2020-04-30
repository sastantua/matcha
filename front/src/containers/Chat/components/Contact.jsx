import React from 'react';
import Picture from '../../../components/Picture/Picture';
import styled from 'styled-components';
import { SPACING } from '../../../config';
import { BREAK_POINTS } from '../../../config/style';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	width: 95%;
	${p => p.selected && 'background-color: rgba(0, 0, 0, .05);'}
	margin: ${SPACING.XS} 0;
	padding: ${SPACING.XS};
	border-radius: 10px;
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}){
		justify-content: center;
	}
`

const Typography = styled.h4`
	margin-left: ${SPACING.BASE};
`

export default ({ user, handleClick, selected }) => {
	const picture = user.pictures.filter(picture => picture.isPP)[0];
	return (
		<Wrapper onClick={(e) => handleClick(user)} selected={selected}>
			<Picture width={'50px'} src={picture.url} round={true}/>
			<Typography>{`${user.firstname} ${user.lastname}`}</Typography>
		</Wrapper>
	)
}