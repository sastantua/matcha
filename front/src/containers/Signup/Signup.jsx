import React from 'react';

import SignupLarge from './SignupLarge'
import SignupMedium from './SignupMedium'
import SignupSmall from './SignupSmall'

function Signup() {
	let windowWidth = window.innerWidth;

	if (windowWidth >= 1024)
		return (<SignupLarge/>);
	else if (windowWidth >= 720)
		return (<SignupMedium/>);
	else
		return (<SignupSmall/>);
}

export default Signup;