import React from 'react';

import EmojiButton from './EmojiButton/EmojiButton'
import Clock from './Clock/Clock';
import './Footer.css';

class Footer extends React.Component {
	render() {
		/* React Logo Spin */
		var duration = 5;
		var changeDuration = () => {
			let logo = document.getElementById("App-logo");
			duration > 0.15 ? duration -= .25 : duration = 1;
			console.log(duration);
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
			<div id="footerMainDiv">
				<footer id="footer">
					<div id="flex_row_container">
						<Clock />
						<EmojiButton id="react-logo" changeDuration={changeDuration} />
					</div>
				</footer>
			</div>
		)
	}
}

export default Footer;