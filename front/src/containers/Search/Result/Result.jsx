import React, { useState } from 'react';
import styled from 'styled-components'
import { styled as styledMaterial } from '@material-ui/core';

// import { Typography } from '@material-ui/core';

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

// const TextWrapper = styledMaterial(Typography)({
// 	fontSize: '1rem',
// 	color: "#FFF"
// });

function Result() {
	const [value, setValue] = useState(10);

	return (
		<ResultContainer>
			
		</ResultContainer>
	);
}

export default Result;