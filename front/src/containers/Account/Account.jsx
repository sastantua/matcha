import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import api from '../../api/api'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { InputWrapper } from '../../components/Wrapper/Wrapper.jsx';
import { Button } from '@material-ui/core';

import logo from '../../media/cerisier.jpg';
import useStyles from '../../helper/useStyles'
import CustomSlider from './CustomSlider'
import './Account.css'

function Account() {
	const classes = useStyles();
	const { user, setUser } = useContext(UserContext);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		api.post('/user/edit', user)
		.then((res) => {console.log(res);})
		.catch((err) => {console.log(err);})
	}

	const handleEmail = (e) => {setUser({...user, email: e.target.value});}
	const handleUsername = (e) => {setUser({...user, username: e.target.value});}
	const handleFirstname = (e) => {setUser({...user, firstname: e.target.value});}
	const handleLastname = (e) => {setUser({...user, lastname: e.target.value});}
	const handleAge = (e) => {setUser({...user, age: e.target.value});}
	const handleBiography = (e) => {setUser({...user, biography: e.target.value});}

	return (
		<div id="account-small">
			<Header />
			<div id="main-container">
				<img src={logo} id="profile-picture" alt="profile-picture"/>
				<form id="edit-form" className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
					<InputWrapper variant="outlined" label={ user ? user.email : "email"} name="email" onChange={handleEmail}/>
					<InputWrapper variant="outlined" label={"username"} value={user && user.username} name="username" onChange={handleUsername}/>
					<InputWrapper variant="outlined" label={ user ? user.firstname : "firstname"} name="firstname" onChange={handleFirstname}/>
					<InputWrapper variant="outlined" label={ user ? user.lastname : "lastname"} name="lastname" onChange={handleLastname}/>
					<InputWrapper variant="outlined" label={ user && user.age ? user.age : "age"} name="age" onChange={handleAge}/>
					<InputWrapper variant="outlined" label={ user && user.biography ? user.biography : "biography"} name="biography" onChange={handleBiography}/>
					<CustomSlider />
					<Button color="secondary" type='submit'>save</Button>
					</form>
				</div>
			<Footer />
		</div>
	);
}

export default Account;