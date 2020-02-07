import React from 'react';
import { useHistory } from "react-router-dom";
import api from '../../api/api'
import HeaderLarge from './HeaderLarge';
import HeaderMedium from './HeaderMedium';
import HeaderSmall from './HeaderSmall';
import './Header.css';

function Header() {
	let windowWidth = window.innerWidth;
	const history = useHistory();
	// console.log(windowWidth);
	const handleClick = () => {
		api.post('/user/logout')
		.then(() => {
			localStorage.removeItem("token");
			delete api.defaults.headers.common['Authorization'];
			history.push("/login");
		})
		.catch((err) => console.log(`${err.response.data.message}`));
	}

	if (windowWidth >= 1024)
		return (<HeaderLarge handleClick={handleClick}/>);
	else if (windowWidth >= 720)
		return (<HeaderMedium handleClick={handleClick}/>);
	else
		return (<HeaderSmall handleClick={handleClick}/>);
}

export default Header;

// https://neo4j.com/download-thanks/?edition=community&release=4.0.0&flavour=unix