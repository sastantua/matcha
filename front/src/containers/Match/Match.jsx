import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import api from '../../api/api'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { Button, Paper } from '@material-ui/core';
import { Favorite as FavoriteIcon, ArrowForwardIos as ArrowForwardIosIcon, ArrowBackIos as ArrowBackIosIcon, AspectRatio as AspectRatioIcon } from '@material-ui/icons';
import logo from '../../media/cerisier.jpg';
import useStyles from '../../helper/useStyles'
import TestCard from './TestCard'
import './Match.css'

function Match() {
	const classes = useStyles();
	const { user, setUser } = useContext(UserContext);
	
	return (
		<div id="match-small">
			<Header />
			<Paper id="main-container" component='div'>
				<img src={logo} id="profile-picture" alt="profile-picture"/>
				<div id="button-container">
					<ArrowBackIosIcon htmlColor='#FAE3D9' />
					<FavoriteIcon htmlColor='#FAE3D9' className="icon-btn" />
					<ArrowForwardIosIcon htmlColor='#FAE3D9' className="icon-btn" />
						{/* <Button color="secondary" type='submit'>like</Button> */}
						{/* <Button color="secondary" type='submit'>skip</Button> */}
					{/* </FavoriteIcon> */}
				</div>
			</Paper>
			<Footer />
		</div>
	);
}

export default Match;