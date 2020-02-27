import React from 'react';
import styled from 'styled-components'

import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { TextWrapper } from '../../../components/Wrapper/Wrapper.jsx';

const PrettoSlider = withStyles({
		root: {
			color: '#000',
			height: 8,
			width: 200,
		}, thumb: {
			height: 24,
			width: 24,
			backgroundColor: '#FFF',
			border: '2px solid currentColor',
			marginTop: -8,
			marginLeft: -12,
			'&:focus,&:hover,&$active': {
					boxShadow: 'inherit',
			},
		}, active: {
		}, valueLabel: {
			left: 'calc(-50% + 4px)',
		}, track: {
			height: 8,
			borderRadius: 4,
		}, rail: {
			height: 8,
			borderRadius: 4,
		},
})(Slider);

const LocalisationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

function LocalisationSlider() {
	return (
		<LocalisationContainer>
			<TextWrapper>Localisation</TextWrapper>
			<PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={50} />
		</LocalisationContainer>
	);
}

export default LocalisationSlider;