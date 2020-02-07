import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import api from '../../api/api'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { InputWrapper } from '../../components/Wrapper/Wrapper.jsx';
import { Button } from '@material-ui/core';

import useStyles from '../../helper/useStyles'
import './Account.css'


function Account() {
	const classes = useStyles();
	const { user, setUser } = useContext(UserContext);
	
	const handleEmail = (e) => {setUser({...user, email: e.target.value});}
	const handleUsername = (e) => {setUser({...user, username: e.target.value});}
	const handleFirstname = (e) => {setUser({...user, firstname: e.target.value});}
	const handleLastname = (e) => {setUser({...user, lastname: e.target.value});}
	const handleBio = (e) => {setUser({...user, bio: e.target.value});}

	const handleSubmit = (e) => {
		e.preventDefault();
		api.post('/user/edit', user)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		})
	}
	
	// const handle = (e) => {setUser({...user, username: e.target.value});}

	return (
		<div id="account-small">
			<Header />
				<form id="edit-form" className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
				<InputWrapper variant="outlined" label={ user ? user.email : "email"} name="email" onChange={handleEmail}/>
				<InputWrapper variant="outlined" label={ user ? user.username : "username"} name="username" onChange={handleUsername}/>
				<InputWrapper variant="outlined" label={ user ? user.firstname : "firstname"} name="firstname" onChange={handleFirstname}/>
				<InputWrapper variant="outlined" label={ user ? user.lastname : "lastname"} name="lastname" onChange={handleLastname}/>
				<InputWrapper variant="outlined" label={ user ? user.bio : "bio"} name="bio" onChange={handleBio}/>
				{/* <InputWrapper variant="outlined" label={ user ? user.username : "email"} name="email" onChange={handleEmail}/> */}
				<Button color="secondary" type='submit'>save</Button>
				</form>
			<Footer />
		</div>
	);
}

export default Account;