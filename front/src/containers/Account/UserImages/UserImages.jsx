import React from 'react';
import { useState } from 'react';
// import { useContext } from 'react';
// import { UserContext } from '../../../context/UserContext';
import api from '../../../api/api'

import { makeStyles } from '@material-ui/core/styles';
import { TextField,Button, styled as styledMaterial } from '@material-ui/core';
import logo from '../../../media/cerisier.jpg';
import './UserImages.css'

const InputWrapper = styledMaterial(TextField)({
	fontSize: '1rem',
	width: '12rem',
	color: '#OOB7FF'
});

const useStyles = makeStyles({
	root: {
		background: '#FF3860',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '0 30px',
		// marginTop: '10px',
		// display: 'flex',
		// justifyContent: 'center',
		// alignItems: 'center',
		// marginRight: '80px',
	},
});


function UserImages() {
	const classes = useStyles();
	
	// const { user, setUser } = useContext(UserContext);
	
	const [selectedFile, setSelectedFile] = useState({file: '', loaded: ''});
	
	const addPictureFile = (e) => {
		// console.log("start");
		// console.log(e.target.files[0])
		
		setSelectedFile({
			...selectedFile, 
			file: e.target.files[0],
			loaded: 0,
		});	

		api.post('/user/picture')
		.then((res) => {
			// console.log(res);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	console.log(selectedFile);

	const uploadPicture = () => {
		const data = new FormData() 
		data.append('picture', selectedFile.file, {})
		api.post('/user/picture', data)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	return (
		<div id="user-images-small">
			<InputWrapper type="file" name="file" onChange={addPictureFile} variant="filled"/>
			<Button type="button" className={classes.root} onClick={uploadPicture}>Upload</Button>
		</div>
	);
}

export default UserImages;

















{/* <img src={logo} id="profile-picture" alt="profile" /> */}
{/* <form id="image-form" className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}> */}
	{/* <InputWrapper type="file" label={"profile-picture"} name="profile-picture" onChange={addPicture} variant="outlined"/> */}
	{/* <input type="file" accept="image/*" id="imageDataFile" name="imageDataFile" style="display: none;"/> */}
{/* </form> */}
