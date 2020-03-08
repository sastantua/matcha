import React from 'react';

import LoginLarge from './LoginLarge'
import LoginMedium from './LoginMedium'
import LoginSmall from './LoginSmall'

function Login() {
	let windowWidth = window.innerWidth;

	if (windowWidth >= 1024)
		return (<LoginLarge/>);
	else if (windowWidth >= 720)
		return (<LoginMedium/>);
	else
		return (<LoginSmall/>);
}

export default Login;