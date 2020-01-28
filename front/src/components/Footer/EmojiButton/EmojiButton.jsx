import React from 'react';
import './EmojiButton.css';
import logo from '../../../media/reactlogoblue.svg';
// import btc from './bitcoin.svg';

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
			<div id="ReactLogo">
				<img src={logo} onClick={handleClick} id="App-logo" alt="logo" />
			</div>
		)
	}
}

export default EmojiButton;