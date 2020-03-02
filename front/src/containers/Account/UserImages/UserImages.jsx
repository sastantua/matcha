import React, { useState } from 'react';
import styled from 'styled-components'
import api from '../../../api/api'

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, styled as styledMaterial} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import Actions from './Actions/Actions';
// import logo from '../../../media/cerisier.jpg';
import FlickityComponent from 'react-flickity-component'
import 'flickity/css/flickity.css'
// import 'flickity-fullscreen/fullscreen.css'

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
	}, setProfile: {
		background: '#FF3860',
	}, delete: {
		background: '#FF3860',
	}, exitBtn: {
		position: 'absolute',
		background: '#FF3860',
		top: '10%',
		left: '90%',
		border: 'solid',
		borderRadius: '30%',
	}
});

const ModalContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 280vh;
	margin-top: 10vh;
	margin-bottom: 8vh;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	flex-direction: column;
	align-items: center;
`

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 1.5em;
`

const ExitButton = styled.button`
	position: absolute;
	background: #FF3860;
	top: 1.5%;
	left: 90%;
	border: solid;
	border-radius: 30%;
`

const IsProfilePic = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #32CD32;
	top: 1.5%;
	left: 5%;
	border: solid;
	border-radius: 30%;
`

function UserImages() {
	const classes = useStyles();
	
	// const { user, setUser } = useContext(UserContext);
	const [userPictures, setUserPictures] = useState([]);
	const [selectedFile, setSelectedFile] = useState();
	const [selectedPicture, setSelectedPicture] = useState(undefined);

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
				.then((res) => {getUserPictures();})
				.catch((err) => {console.log(err);})
			} else
				alert('you cant have more than 5 pictures');
		}
	}

	const getUserPictures = () => {
		api.get('/user/picture')
		.then((res) => {setUserPictures(res.data);})
		.catch((err) => {console.log(err);})
	}

	const setProfilePicture = (id) => {
		api.post('/user/profile', { _id: id })
		.then((res) => {
			getUserPictures();
			setSelectedPicture(id);
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	const deleteUserPicture = (id) => {
		api.delete('/user/picture', { data: { _id: id } })
		.then((res) => {getUserPictures();})
		.catch((err) => {console.log(err);})
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

	const UserImagesArray = () => {
		return (
			userPictures.map((text, index) => 
				<img id={`profile-image-${index}`} src={text.url} alt={text.name} key={text.name} onClick={() => openModal(text._id)}/>
		));
	}
	
	const openModal = (id) => {
		setSelectedPicture(userPictures.filter(userPicture => userPicture._id === id)[0]);
	}

	const PictureModal = (props) => {
		return (
			<ModalContainer>
				<img src={props.image.url} alt=""/>
				<ButtonContainer>
					<Button type="button" className={classes.setProfile} onClick={() => setProfilePicture(props.image._id)}>set as profile</Button> 
					<Button type="button" className={classes.delete} style={{marginTop: '1em'}} onClick={() => deleteUserPicture(props.image._id)}>delete</Button> 
					{!!props.image.isPP && 
					<IsProfilePic>
						<AccountCircle/>
					</IsProfilePic>}
					<ExitButton onClick={() => setSelectedPicture(undefined)}>X</ExitButton> 
				</ButtonContainer>
			</ModalContainer>
		);
	}
	
	const UserImagesJsx = () => {
		return (
			<FlickityComponent className={'carousel'} elementType={'div'} options={flickityOptions}>
				<UserImagesArray/>
			</FlickityComponent>
		);
	}



	if (!userPictures.length)
		getUserPictures();

	return (
		<div id="container-user-image-small">
			{ selectedPicture && <PictureModal image={selectedPicture}/> }
			<div id="user-images-display-small">
				{ !!userPictures.length && <UserImagesJsx /> }
			</div>
			<div id="user-images-upload-small">
				{ userPictures.length < 5 && <InputWrapper type="file" name="file" label="" onChange={addPictureFile} variant="filled"/> }
				{ userPictures.length < 5 && <Button type="button" className={classes.root} onClick={uploadPicture}>Upload</Button> }
			</div>
		</div>
	);
}

export default UserImages;