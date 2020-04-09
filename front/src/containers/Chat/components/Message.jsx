import React from 'react';
import styled from 'styled-components';

import { SPACING } from '../../../config/style';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	${p => p.self && 'align-self: flex-end;'}
	max-width: 49%;
	min-width: 50px;
	padding: ${SPACING.XXS} ${SPACING.XS};
	margin-top: ${SPACING.XXS};
	border-radius: 1.3em;
	background-color: ${p => p.self ? '#0084ff' : '#f1f0f0'};
	color: ${p => p.self ? '#f1f0f0' : 'black'};
`

export default ({ content, self }) => {
	return (
		<Container self={self}>
			{content.message}
		</Container>
	)
}