import React, { useState, useContext } from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core';

import SearchRequestContext from '../../../context/SearchRequestContext';

import { Typography } from '@material-ui/core';

import DistanceSlider from './DistanceStyling';

const DistanceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TextWrapper = styledMaterial(Typography)({
	fontSize: '1rem',
	color: "#FFF"
});

function Distance() {
	const [value, setValue] = useState(20);
	const [request, setRequest] = useContext(SearchRequestContext);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		setRequest({
			...request, 
			distance: value,
		});
	};

	return (
		<DistanceContainer>
			<TextWrapper>Distance</TextWrapper>
			<DistanceSlider 
				value={value}
				onChange={handleChange}
				valueLabelDisplay="auto"
				max={10000}
			/>
		</DistanceContainer>
	);
}

export default Distance;