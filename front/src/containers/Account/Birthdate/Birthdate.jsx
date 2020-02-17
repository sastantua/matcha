import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  container: {
	display: 'flex',
	flexWrap: 'wrap',
  },
  textField: {
	marginLeft: theme.spacing(1),
	marginRight: theme.spacing(1),
	width: 200,
  },
}));

function Birthdate(props) {
	const classes = useStyles();

	return (
		<TextField
			onChange={props.update}
			id="date"
			label="Birthdate"
			type="date"
			defaultValue="1980-01-01"
			className={classes.textField}
			InputLabelProps={{
			  shrink: true,
			//   color: "secondary",
			}}
		/>
	);
}

export default Birthdate;

