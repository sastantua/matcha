import React from 'react';

class EmojiButton extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			emoji: ["😆", "🤣", "😝", "🤪", "🤢", "🤮", "🤯", "😈", "🤫"],
			index: 0
		};
	}
	
	render () {
		const handleClick = () => {
			this.props.changeDuration();
			this.state.index === 8 ? this.setState({index: 0}) : this.setState({index: this.state.index + 1});

		}
		return (
			<button className="App-btn" onClick={handleClick}>
				{this.state.emoji[this.state.index]}
			</button>
		)
	}
}

export default EmojiButton;