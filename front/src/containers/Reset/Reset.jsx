import React from 'react';
import styled from 'styled-components';

// import ResetLarge from './ResetLarge'
// import ResetMedium from './ResetMedium'
import ResetSmall from './ResetSmall'

const ResetContainer = styled.div`
	display: flex;
`



function Reset() {
	// let windowWidth = window.innerWidth;
	
	// if (windowWidth >= 1024)
	// 	return (<ResetLarge/>);
	// else if (windowWidth >= 720)
	// 	return (<ResetMedium/>);
	// else
		return (<ResetSmall/>);}

export default Reset;
