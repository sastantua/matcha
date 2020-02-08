import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import HeaderLarge from './HeaderLarge';
import HeaderMedium from './HeaderMedium';
import HeaderSmall from './HeaderSmall';
import api from '../../api/api'
import './Header.css';

function Header() {
	let windowWidth = window.innerWidth;

	const history = useHistory();

	const useStyles = makeStyles({
		list: {
			width: 250,
		},
		fullList: {
			width: 'auto',
		},
		paper: {
			background: "#ff3860",
			color: 'white'
		}
	});

	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});	
	
	const toggleDrawer = (side, open) => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return ;
		}
	
		setState({ ...state, [side]: open });
	};

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
		return (<HeaderLarge handleClick={handleClick} toggleDrawer={toggleDrawer} state={state} useStyles={useStyles} />);
	else if (windowWidth >= 720)
		return (<HeaderMedium handleClick={handleClick}/>);
	else
		return (<HeaderSmall handleClick={handleClick}/>);
}

export default Header;

// https://neo4j.com/download-thanks/?edition=community&release=4.0.0&flavour=unix