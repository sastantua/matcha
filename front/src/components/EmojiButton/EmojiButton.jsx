import React from 'react';
import './EmojiButton.css';
import logo from './logo.svg';
import { Button } from 'react-bulma-components';

class EmojiButton extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			index: 0,
			emoji: ["😆", "🤣", "😝", "🤪", "🤢", "🤮", "🤯", "😈", "🤫"]
		};
	}


	render () {
		const handleClick = () => {
			this.props.changeDuration();
			console.log(this.state);
			this.state.index === 8 ? this.setState({index: 0}) : this.setState({index: this.state.index + 1});
		}

		return (
			<div id="ReactLogo">
				<img src={logo} id="App-logo" alt="logo" />
				<Button id="EmojiButton" onClick={handleClick}>
					{this.state.emoji[this.state.index]}
				</Button>
			</div>
		)
	}
}

export default EmojiButton;