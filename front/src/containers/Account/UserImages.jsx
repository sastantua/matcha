import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import api from '../../api/api'

import logo from '../../media/cerisier.jpg';
import useStyles from '../../helper/useStyles'
import './UserImages.css'

function UserImages() {
	const classes = useStyles();
	const { user, setUser } = useContext(UserContext);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		api.post('/user/edit', user)
		.then((res) => {console.log(res);})
		.catch((err) => {console.log(err);})
	}

	// const handleProfilePicture = (e) => {setUser({...user, email: e.target.value});}

	return (
		<div id="user-images-small">
			<img src={logo} id="profile-picture" alt="profile-picture"/>
			
			
			{/* <form id="edit-form" className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}> */}
				{/* <InputWrapper type="file" label={"profile-picture"} name="profile-picture" onChange={handleProfilePicture} variant="outlined"/> */}
				{/* <input type="file" accept="image/*" id="imageDataFile" name="imageDataFile" style="display: none;"> */}
				{/* <InputWrapper variant="outlined" label={ user && user.biography ? user.biography : "biography"} name="biography" onChange={handleBiography}/> */}
			{/* </form> */}
		</div>
	);
}

export default UserImages;