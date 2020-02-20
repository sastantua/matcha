import React from 'react';
import { useState } from 'react';
// import { useContext } from 'react';
// import { UserContext } from '../../../context/UserContext';
import api from '../../../api/api'

import { makeStyles } from '@material-ui/core/styles';
import { TextField,Button, styled as styledMaterial } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import logo from '../../../media/cerisier.jpg';
import './UserImages.css'

const InputWrapper = styledMaterial(TextField)({
	fontSize: '1rem',
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
	},
	img: {
		marginTop: '2em',
	},
	imageContainerStyle: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		// backgroundColor: theme.palette.background.paper,
		},
	imageStyle: {
		width: 500,
		height: 450,
	},
});


function UserImages() {
	const classes = useStyles();
	
	// const { user, setUser } = useContext(UserContext);
	const [userHasPicture, setUserHasPicture] = useState(false);
	const [userPictures, setUserPictures] = useState([{}]);
	const [selectedFile, setSelectedFile] = useState({file: '', loaded: ''});
	
	// Add a picture in the application state
	const addPictureFile = (e) => {
		setSelectedFile({
			...selectedFile, 
			file: e.target.files[0],
			loaded: 0,
		});	
	}

	// Upload the picture from app to server
	const uploadPicture = () => {
		if (selectedFile.file) {
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
	}

	const getUserPictures = () => {
		api.get('/user/picture')
		.then((res) => {
			if (res.data)
				setUserHasPicture(true);
			setUserPictures(res.data);
			console.log(`getUserPictures ${res.data}`);
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	const deleteUserPicture = (id) => {
		let _id = {params: {_id: id}}
		api.delete('/user/picture', _id)
		.then((res) => {
			// remove picture from userPictures;
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		})
	}
	
	var userImagesJsx = null;
	console.log("userPictures");
	console.log(userPictures);
	if (userHasPicture) {
		userImagesJsx = () =>
			<div className={classes.imageContainerStyle}>
				<GridList cellHeight={160} className={classes.imageStyle} cols={3}>
					{userPictures.map(text => (
						<GridListTile key={text.id} cols={1}>
							<img src={text.url} alt="fuck" />
						</GridListTile>
					))}
				</GridList>
			</div>
	}	
				// <img src={text.url} alt="alt" key={text.id} className={classes.img} onClick={() => deleteUserPicture(text.id)}/>

	// console.log(userImagesJsx);

	if (userPictures.length <= 1) // normal?
		getUserPictures();
	
	// console.log(selectedFile);
	return (
		<div id="main-container">
			<div id="user-images-display-small">
				{ userImagesJsx }
			</div>
			<div id="user-images-upload-small">
				<InputWrapper type="file" name="file" onChange={addPictureFile} variant="filled"/>
				<Button type="button" className={classes.root} onClick={uploadPicture}>Upload</Button>
			</div>
		</div>
	);
}

export default UserImages;

















{/* <img src={logo} id="profile-picture" alt="profile" /> */}
{/* <form id="image-form" className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}> */}
	{/* <InputWrapper type="file" label={"profile-picture"} name="profile-picture" onChange={addPicture} variant="outlined"/> */}
	{/* <input type="file" accept="image/*" id="imageDataFile" name="imageDataFile" style="display: none;"/> */}
{/* </form> */}
