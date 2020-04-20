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

function UserImages(props) {
	let userPictures = props.images;

	if (userPictures) {
		const userPicturesArray = userPictures.map((text, index) => 
			<img id={`profile-image-${index}`} src={text.url} alt={text.name} key={index} />
		);
		// onClick={() => openModal(text._id)}
		const UserImagesJsx = () => {
			return (
				<ImagesContainer>
					<FlickityComponent className={'carousel'} elementType={'div'} options={flickityOptions}>
						{ userPicturesArray }
					</FlickityComponent>
				</ImagesContainer>
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

export default UserImages;