import React from 'react';
import styled from 'styled-components'

import FlickityComponent from 'react-flickity-component'
import 'flickity/css/flickity.css'

const ImagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

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

function UserPictures(props) {
	if (props.pictures) {
		console.log("here", props.pictures);
		const userPicturesArray = props.pictures.map((text, index) => 
			<img id={`profile-image-${index}`} src={text.url} alt={text.name} key={text.name} /> // onClick={() => openModal(text._id)}
		);
		// src="http://matchapi.guillaumerx.fr/images/image-1584066883258.png"
		console.log("userPicturesArray", userPicturesArray);

		const UserImagesJsx = () => {
			return (
				<FlickityComponent className={'carousel'} elementType={'div'} options={flickityOptions}>
					{ userPicturesArray }
				</FlickityComponent>
			);
		}

		return (
			<ImagesContainer>
				<UserImagesJsx/>
			</ImagesContainer>
		);	
	} else {
		return ;
	}
}

export default UserPictures;