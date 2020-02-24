import React, { useState } from 'react';
import styled from 'styled-components'
import api from '../../../api/api'

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, styled as styledMaterial} from '@material-ui/core';

// import Actions from './Actions/Actions';
// import logo from '../../../media/cerisier.jpg';
import FlickityComponent from 'react-flickity-component'
import 'flickity/css/flickity.css'
import 'flickity-fullscreen/fullscreen.css'

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
	}, img: {
		marginTop: '2em',
	}, imageContainerStyle: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		// backgroundColor: theme.palette.background.paper,
	}, imageStyle: {
		// width: 500,
		// height: 450,
	}, actions: {
		background: '#FF3860',
	}
});

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 5em;
`

function UserImages() {
	const classes = useStyles();
	
	// const { user, setUser } = useContext(UserContext);
	const [userPictures, setUserPictures] = useState([]);
	const [selectedFile, setSelectedFile] = useState();

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
		if (selectedFile && selectedFile.file) {
			if (userPictures.length < 5) {
				const data = new FormData()
				data.append('picture', selectedFile.file, {})
				api.post('/user/picture', data)
				.then((res) => {
					getUserPictures();
				})
				.catch((err) => {
					console.log(err);
				})
			}
			else
				alert('you cant have more than 5 pictures');
		}
	}

	const getUserPictures = () => {
		api.get('/user/picture')
		.then((res) => {
			setUserPictures(res.data);
			console.log(res.data)
			console.log(`getUserPictures ${res.data}`);
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	const deleteUserPicture = (id) => {
		console.log(id);
		api.delete('/user/picture', { data: { _id: id } })
		.then((res) => {
			getUserPictures();
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	const UserImagesArray = () => {
		return (
			userPictures.map((text, index) => 
				<img id={`profile-image-${index}`} src={text.url} alt={text.name} key={text.name}/>
		));
	}

	const flickityOptions = {
		initialIndex: 2,
		draggable: '>1',
		freeScroll: false,
		wrapAround: false,
		groupCells: true,
		autoPlay: 6000,
		fullscreen: true,
		adaptiveHeight: true,
		imagesLoaded: true,
		lazyLoad: true,
		prevNextButtons: true,
		pageDots: true,
		fade: false,
		arrowShape: { 
			x0: 10,
			x1: 60, y1: 50,
			x2: 70, y2: 40,
			x3: 30
		}
	}

	const UserImagesJsx = () => {
		return (
			<FlickityComponent className={'carousel'} elementType={'div'} options={flickityOptions} disableImagesLoaded={false} reloadOnUpdate={false} static={false}>
				<UserImagesArray/>
			</FlickityComponent>
		);
	}

	if (!userPictures.length)
		getUserPictures();

	return (
		<div id="container-user-image-small">
			<div id="user-images-display-small">
				{ userPictures.length && <UserImagesJsx /> }
			</div>
			<ButtonContainer>
				<Button type="button" className={classes.actions}>set as profile</Button> 
				<Button type="button" className={classes.actions}>delete</Button> 
			</ButtonContainer>
			<div id="user-images-upload-small">
				{ userPictures.length < 5 && <InputWrapper type="file" name="file" label="" onChange={addPictureFile} variant="filled"/> }
				{ userPictures.length < 5 && <Button type="button" className={classes.root} onClick={uploadPicture}>Upload</Button> }
			</div>
		</div>
	);
}

export default UserImages;