import React from 'react';

import HeaderLarge from './HeaderLarge';
import HeaderMedium from './HeaderMedium';
import HeaderSmall from './HeaderSmall';
import './Header.css';

function Header() {
	let windowWidth = window.innerWidth;
	console.log(windowWidth);

	if (windowWidth >= 1024)
		return (<HeaderLarge/>);
	else if (windowWidth >= 720)
		return (<HeaderMedium/>);
	else
		return (<HeaderSmall/>);
}

export default Header;

// https://neo4j.com/download-thanks/?edition=community&release=4.0.0&flavour=unix