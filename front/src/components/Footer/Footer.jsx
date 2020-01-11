import React from 'react';

import { Footer } from 'react-bulma-components';

import Clock from '../Clock/Clock';
import './Footer.css';

class Foooter extends React.Component {
	render() {
		return (
			<div id="footerMainDiv">
				<footer className="footer">
					<div className="content has-text-centered">
						<p><strong>Paris:</strong></p>
						<Clock />
					</div>
				</footer>
			</div>
		)
	}
}

export default Foooter;