import React from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core';

import { Typography } from '@material-ui/core';

import AgeSlider from '../SliderStyling/AgeStyling';


const AgeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TextWrapper = styledMaterial(Typography)({
	fontSize: '1rem',
	color: "#FFF"
});

function valuetext(value) {
	return `${value}`;
}

function Age() {
	const [value, setValue] = React.useState([20, 80]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<AgeContainer>
			<TextWrapper>Age</TextWrapper>
			<AgeSlider
				value={value}
				onChange={handleChange}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
				getAriaValueText={valuetext}
			/>
		</AgeContainer>
	);
}

export default Age;