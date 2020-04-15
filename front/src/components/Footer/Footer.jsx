import React from 'react';
import styled from "styled-components";
import { styled as styledMaterial } from '@material-ui/core/styles';
import { colors, device } from '../../config/style'

import EmojiButton from './EmojiButton/EmojiButton'
import Clock from './Clock/Clock';

const FooterContainer = styled.div`
	position: fixed;
	@media ${device.mobileS} {
		height: 8vh;
	}
	@media ${device.tablet} {
		height: 5vh;
	}
	width: 100vw;
	bottom: 0;
	background-color: ${colors.two};
`

const FooterComponent = styled.footer`
	@media ${device.mobileS} {
		height: 8vh;
	}
	@media ${device.tablet} {
		height: 5vh;
	}
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
`

class Footer extends React.Component {
	render() {
		/* React Logo Spin */
		var duration = 5;
		var changeDuration = () => {
			let logo = document.getElementById("App-logo");
			duration > 0.15 ? duration -= .25 : duration = 1;
			logo.animate([
				{ transform: 'rotate(0deg)' },
				{ transform: 'rotate(360deg)' }
			],
			{
				duration: duration,
				iterations: Infinity
			})
		}

		return (
			<FooterContainer>
				<FooterComponent>
					<Clock />
					<EmojiButton changeDuration={changeDuration} />
				</FooterComponent>
			</FooterContainer>
		)
	}
}

export default Footer;