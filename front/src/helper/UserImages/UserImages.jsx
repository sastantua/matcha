import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselContainer = styled.div`
	width: 100%;
	height: auto;
`

function UserImages(props) {
	const userImagesArray = props.match.pictures.map((text, index) =>
		<img id={`profile-image-${index}`} src={text.url} alt={text.name} key={text._id}/>
	);

	const UserImagesJsx = () => {
		return (
			<CarouselContainer>
				<Carousel showThumbs={false} showArrows={true} useKeyboardArrows={true} emulateTouch={true}>
					{ userImagesArray }
				</Carousel>
			</CarouselContainer>
		);
	}

	return (
		<div id="container-user-image-small">
			<div id="user-images-display-small">
				<UserImagesJsx/>
			</div>
		</div>
	);
}

export default UserImages;
