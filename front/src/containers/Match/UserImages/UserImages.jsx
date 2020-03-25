import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import api from '../../../api/api'

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, styled as styledMaterial} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

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

const ImagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const CarouselContainer = styled.div`
	width: 100%;
	height: 100%;
`


// le probleme c'est que ce composant gere tous les utilisateurs en même temps au lieu de les fetch un par un ...

function UserImages(props) {
	const [selectedPicture, setSelectedPicture] = useState(undefined);

	const userImagesArray = props.match[props.matchIndex].pictures.map((text, index) =>
		<img id={`profile-image-${index}`} src={text.url} alt={text.name} key={text._id} onClick={() => openModal(text._id)}/>
	);

	const openModal = (id) => {
		setSelectedPicture(props.match.pictures.filter(userPicture => userPicture._id === id)[0]);
	}

	const PictureModal = (props) => {
		return (
			<ModalContainer>
				<img src={props.image.url} alt=""/>
			</ModalContainer>
		);
	}
	
	const UserImagesJsx = () => {
		return (
			<CarouselContainer>
				<Carousel showThumbs={false} showArrows={true} useKeyboardArrows={true} emulateTouch={true}>
					{ userImagesArray }
				</Carousel>
			</CarouselContainer>
		);
	}

	console.log("here");
	
	return (
		<div id="container-user-image-small">
			{ selectedPicture && <PictureModal image={selectedPicture}/> }
			<div id="user-images-display-small">
				{ <UserImagesJsx /> }
				{/* { !!props.match && <UserImagesJsx /> } */}
			</div>
		</div>
	);
}

export default UserImages;
