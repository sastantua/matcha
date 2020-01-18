import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import styled from "styled-components"

import EmojiButton from '../../EmojiButton/EmojiButton'

import './Choice.css'

function Choice() {
	/* React Logo Spin */
	var duration = 5;
	var changeDuration = () => {
		let logo = document.getElementById("App-logo");
		// logo.style.width = "20em";
		// logo.style.height = "20em";
		duration > 0.15 ? duration -= .25 : duration = 1;
		logo.animate([
			{ transform: 'rotate(0deg)' },
			{ transform: 'rotate(360deg)' }
		],
		{
			duration: duration,
			iterations: Infinity
		})
	}

	return (
		<div id="main-wrapper">
			{/* <div id="second-wrapper-top"> */}
				{/* <EmojiButton changeDuration={changeDuration} /> */}
			{/* </div> */}
			<div id="second-wrapper-bottom">
				<Button variant="contained" color="secondary">
					<Link to="/signup" style={{ color:'#FFF'}}>
						signup
					</Link>
				</Button>
				<Button variant="contained" color="secondary">
					<Link to="/login" style={{ color:'#FFF'}}>
						login
					</Link>
				</Button>
			</div>
		</div>
	);
}

export default Choice