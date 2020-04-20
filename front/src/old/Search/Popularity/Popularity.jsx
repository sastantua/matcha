import React, { useState, useContext } from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core';

import SearchRequestContext from '../../../context/SearchRequestContext';

import { Typography } from '@material-ui/core';

import PopularitySlider from './PopularityStyling';


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
	const [value, setValue] = useState([20, 80]);
	const [request, setRequest] = useContext(SearchRequestContext);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		setRequest({
			...request, 
			popularity: {
				min: value[0],
				max: value[1],
			}
		});
	};

	return (
		<PopularityContainer>
			<TextWrapper>Popularity</TextWrapper>
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