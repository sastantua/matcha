import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
        },
    },
    example: {
        background: '#FF600B',
        color: '#000',
        fontSize: '10px',
    },  
}));

export default function FormPropsTextFields() {
    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div className="register">
                <TextField
                className={classes.example}
                label="First Name"
                // id="outlined-password-input imp"
                type="text"
                variant="outlined"
                />
                <TextField
                className={classes.example}
                label="Last Name"
                id="outlined-password-input imp"
                type="text"
                variant="outlined"
                />
                <TextField
                className={classes.example}
                label="Login"
                id="outlined-password-input imp"
                type="text"
                // autoComplete="current-login"
                variant="outlined"
                />
                <TextField
                className={classes.example}
                label="Password"
                id="outlined-password-input imp"
                type="password"
                // autoComplete="current-password"
                variant="outlined"
                />
                <TextField
                className={classes.example}
                label="Email"
                id="outlined-password-input imp"
                type="email"
                variant="outlined"
                />
            </div>
        </form>
    );
}
