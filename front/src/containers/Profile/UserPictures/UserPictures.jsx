import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components'

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

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

function UserPictures(props) {
	let pictures = props.pictures;

	if (pictures) {
		const userPicturesArray = pictures.map((text, index) => {
			return (
				<div>
					<img id={`profile-image-${index}`} src={text.url} alt={text.name} key={text.name} /> 
				</div>
			);
		});

		const UserImagesJsx = () => {
			return (
				<CarouselContainer>
					<Carousel showThumbs={false} showArrows={true} useKeyboardArrows={true} emulateTouch={true}>
						{ userPicturesArray }
					</Carousel>
				</CarouselContainer>
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