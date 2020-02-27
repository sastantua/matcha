import React from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core';

import { Typography } from '@material-ui/core';

import ProximitySlider from './ProximityStyling';

const ProximityContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const TextWrapper = styledMaterial(Typography)({
	fontSize: '1rem',
	color: "#FFF"
});

function Proximity() {
	const [value, setValue] = React.useState([1, 20]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<ProximityContainer>
			<TextWrapper>Proximity</TextWrapper>
			<ProximitySlider 
				value={value}
				onChange={handleChange}
				valueLabelDisplay="auto"
				aria-label="pretto slider"
				min={1}
				max={20}
			/>
		</ProximityContainer>
	);
}

export default Proximity;