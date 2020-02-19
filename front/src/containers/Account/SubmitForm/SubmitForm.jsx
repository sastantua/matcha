import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
	root: {
		background: '#FF3860',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '0 30px',
		// display: 'flex',
		// justifyContent: 'center',
		// alignItems: 'center',
		// marginRight: '80px',
	},
});

function SubmitForm() {
	const classes = useStyles();
	
	return (
		<Button type='submit' className={classes.root}>Save</Button>
	);
}

export default SubmitForm;