import React from 'react';
import styled from "styled-components";
import logo from '../../../media/reactLogoLove.png';
// import btc from './bitcoin.svg';

const ReactLogoContainer = styled.div
`
	display: flex;
	justify-content: center;
	flex-direction: column;
	height: auto;
	width: 3em;
`

const ReactLogo = styled.img
`
	height: 1.5em;
	width: 1.5em;
	margin-left: 5vw;
`

class EmojiButton extends React.Component {
	constructor (props) {
		super(props);
		this.state = {index: 0};
	}
	
	render () {
		const handleClick = () => {
			this.props.changeDuration();
			this.state.index === 8 ? this.setState({index: 0}) : this.setState({index: this.state.index + 1});
		}

		return (
			<ReactLogoContainer>
				<ReactLogo src={logo} onClick={handleClick} id="App-logo" alt="logo" />
			</ReactLogoContainer>
		)
	}
}

export default EmojiButton;