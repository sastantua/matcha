import React from 'react';
import styled from 'styled-components'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselContainer = styled.div`
	width: 100%;
	height: auto;
`

function UserImages(props) {
	let userImagesArray = [];

	if (props.match === undefined) {
		userImagesArray = props.pictures.map((text, index) =>
			<img id={`profile-image-${index}`} src={text.url} alt={text.name} key={index}/>
		);
	}
	else {
		userImagesArray = props.match.pictures.map((text, index) =>
			<img id={`profile-image-${index}`} src={text.url} alt={text.name} key={index}/>
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

	return (
		<UserImagesJsx/>
	);
}

export default UserImages;
