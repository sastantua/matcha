import React from 'react';
import styled from "styled-components";
import logo from '../../../media/reactlogoblue.svg';
// import btc from './bitcoin.svg';

const ReactLogoContainer = styled.div
`
	display: flex;
	justify-content: center;
	flex-direction: column;
	height: auto;
	width: 3em;
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
				<img src={logo} onClick={handleClick} id="App-logo" alt="logo" />
			</ReactLogoContainer>
		)
	}
}

export default EmojiButton;