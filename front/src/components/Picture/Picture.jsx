import React from 'react';
import styled from 'styled-components';

const ImgWrapper = styled.div`
	width: ${props => props.width};
	height: ${props => props.height};
	border-radius: ${props => props.round ? '50%' : '0'};
	overflow: hidden;
`

const SImg = styled.img`
	height: 100%;
	width: auto;
`

export default ({width = 500, height = width, src, round = false}) => {
	return (
		<ImgWrapper width={width} height={height} round={round}>
			<SImg src={src}/>
		</ImgWrapper>
	)
}