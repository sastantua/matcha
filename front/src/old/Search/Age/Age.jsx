import React, { useState, useContext } from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core';

import SearchRequestContext from '../../../context/SearchRequestContext';

import { Typography } from '@material-ui/core';

import AgeSlider from './AgeStyling';



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
	const [value, setValue] = useState([18, 50]);
	const [request, setRequest] = useContext(SearchRequestContext);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		setRequest({
			...request, 
			age: {
				min: value[0],
				max: value[1],
			}
		});
	};

	return (
		<AgeContainer>
			<TextWrapper>Age</TextWrapper>
			<AgeSlider
				value={value}
				onChange={handleChange}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
				min={18}
				max={50}
				getAriaValueText={valuetext}
			/>
		</AgeContainer>
	);
}

export default Age;