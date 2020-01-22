import React from 'react';
import {Notification, Container} from 'react-bulma-components';
import './Homepage.css';

function Homepage() {
	let windowWidth = window.innerWidth;
	if (windowWidth >= 1024) {
		return (
			<div id="homepage-large">
				<Container style={{ color: '#000', background: '#000'}}>
					<Notification>
						This container is <strong>centered</strong> on desktop
					</Notification>
				</Container>
			</div>
		);
	}
	else if (windowWidth >= 720) {
		return (
			<div id="homepage-medium">
				<Container style={{ color: '#000', background: '#000'}}>
					<Notification>
						This container is <strong>centered</strong> on desktop
					</Notification>
				</Container>
			</div>
		);
	
	}
	else {
		return (
			<div id="homepage-small">
				<Container style={{ color: '#000', background: '#000'}}>
					<Notification>
						This container is <strong>centered</strong> on desktop
					</Notification>
				</Container>
			</div>
		);
	}
}

export default Homepage;