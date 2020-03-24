import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import api from '../../../api/api'

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, styled as styledMaterial} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FlickityComponent from 'react-flickity-component'
import 'flickity/css/flickity.css'

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

function UserImages(props) {
	const [selectedPicture, setSelectedPicture] = useState(undefined);

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

	const userImagesArray = props.match.map((text, index) =>
		<img id={`profile-image-${index}`} src={text.pictures.url} alt={text.pictures.name} key={text.pictures.name} onClick={() => openModal(text.pictures._id)}/>
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
			<FlickityComponent className={'carousel'} elementType={'div'} options={flickityOptions}>
				{ userImagesArray }
			</FlickityComponent>
		);
	}

	return (
		<div id="container-user-image-small">
			{ selectedPicture && <PictureModal image={selectedPicture}/> }
			<div id="user-images-display-small">
				{ !!props.match && <UserImagesJsx /> }
			</div>
		</div>
	);
}

export default UserImages;
