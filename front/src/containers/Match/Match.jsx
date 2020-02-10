import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import api from '../../api/api'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { Button, Paper, Typography, TextareaAutosize } from '@material-ui/core';
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
				<Typography id="username">Nico</Typography>
				{/* <p id="bio">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      				ut labore et dolore magna aliqua
				</p> */}
				<Typography id="bio">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
				    ut labore et dolore magna aliqua.
				</Typography>

				<div id="button-container">
					<ArrowBackIosIcon htmlColor='#FAE3D9' />
					<FavoriteIcon htmlColor='#FAE3D9' className="icon-btn" />
					<ArrowForwardIosIcon htmlColor='#FAE3D9' className="icon-btn" />
				</div>
			</Paper>
			<Footer />
		</div>
	);
}

export default Match;