import React from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core';

import { Typography } from '@material-ui/core';
import PopularitySlider from '../SliderStyling/PopularityStyling';


const PopularityContainer = styled.div`
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

function Popularity() {
	const [value, setValue] = React.useState([20, 80]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<PopularityContainer>
			<TextWrapper>Popularity Score</TextWrapper>
			<PopularitySlider
				value={value}
				onChange={handleChange}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
				getAriaValueText={valuetext}
			/>
		</PopularityContainer>
	);
}

export default Popularity;