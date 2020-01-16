import React from 'react';

import './Signup.css';
import snail from './cerisier.jpg';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
	'& > *': {
	  margin: theme.spacing(1),
	  width: 200,
	},
  },
}));

function Signup() {
	const classes = useStyles();

	return (
		<div id="signup-component">
			<div id="signup-container">
				<div id="signup-left">
					<img src={snail} alt=""/>
				</div>
				<div id="signup-right">
					<div>
						
					</div>
					<div>
						<form className={classes.root} noValidate autoComplete="off">
							<TextField id="outlined-basic" label="Outlined" variant="outlined" />
	  						<TextField id="outlined-basic" label="Outlined" variant="outlined" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}


export default Signup;