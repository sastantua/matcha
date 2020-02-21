import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import api from '../../api/api'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import { InputWrapper } from '../../components/Wrapper/Wrapper.jsx';
import { Button, TextField } from '@material-ui/core';

// import logo from '../../media/cerisier.jpg';

import UserImages from './UserImages/UserImages'
import Birthdate from './Birthdate/Birthdate'
import GenderDropdown from './GenderDropdown/GenderDropdown'
import OrientationDropdown from './OrientationDropdown/OrientationDropdown'
import Hobby from './Hobby/Hobby'
import CustomCheckbox from './CustomCheckbox/CustomCheckbox'
import LocalisationSlider from './LocalisationSlider/LocalisationSlider'
import SubmitForm from './SubmitForm/SubmitForm'

import { makeStyles } from '@material-ui/core/styles';
import './Account.css'


const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: 200,
		},
	},
}));

function Account() {
	const classes = useStyles();
	
	const [openHobby, setOpenHobby] = useState(false);
	const { user, setUser } = useContext(UserContext);

	const dropdowns = {
		oh: openHobby,
		soh: setOpenHobby,
	}
	
	console.log(dropdowns);

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
	const handleBirthdate = (e) => {setUser({...user, birthdate: e.target.value});}
	const handleBiography = (e) => {setUser({...user, biography: e.target.value});}
	
	return (
		<div id="account-small">
			<Header />
			<div id="main-container" className={classes.root}>
				<UserImages />
				<form id="edit-form" className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
					<InputWrapper variant="outlined" label="email" value={ user && user.email ? user && user.email : "" } name="email" onChange={handleEmail}/>
					<InputWrapper variant="outlined" label="username" value={ user && user.username ? user && user.username : "" } name="username" onChange={handleUsername}/>
					<InputWrapper variant="outlined" label="firstname" value={ user && user.firstname ? user && user.firstname : "" } name="firstname" onChange={handleFirstname}/>
					<InputWrapper variant="outlined" label="lastname" value={ user && user.lastname ? user && user.lastname : "" } name="lastname" onChange={handleLastname}/>
					<TextField placeholder="biography" multiline rows={2} rowsMax={4} value={ user && user.biography ? user && user.biography : "" } name="biography" onChange={handleBiography}/>
					<Birthdate update={handleBirthdate}/>
					<GenderDropdown user={user} />
					<OrientationDropdown user={user} />
					<Hobby dropdowns={dropdowns}/>
					<CustomCheckbox/>
					<LocalisationSlider />
					<SubmitForm />
				</form>
			</div>
			<Footer />
		</div>
	);
}

export default Account;