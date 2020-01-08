import React from 'react';
import './EmojiButton.css';

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
			<button id="EmojiButton" onClick={handleClick}>
				{this.state.emoji[this.state.index]}
			</button>
		)
	}
}

export default EmojiButton;