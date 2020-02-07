import React from 'react';
import { Notification, Container } from 'react-bulma-components';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import './Homepage.css';

function Homepage() {
	let windowWidth = window.innerWidth;
	if (windowWidth >= 1024) {
		return (
			<div id="homepage-large">
				<Header/>
				<Container style={{ color: '#000', background: '#000'}}>
					<Notification>
						This container is <strong>centered</strong> on desktop
					</Notification>
				</Container>
				<Footer/>
			</div>
		);
	}
	else if (windowWidth >= 720) {
		return (
			<div id="homepage-medium">
				<Header/>
				<Container style={{ color: '#000', background: '#000'}}>
					<Notification>
						This container is <strong>centered</strong> on desktop
					</Notification>
				</Container>
				<Footer/>
			</div>
		);
	
	}
	else {
		return (
			<div id="homepage-small">
				<Header/>
				<Container style={{ color: '#000', background: '#000'}}>
					<Notification>
						This container is <strong>centered</strong> on desktop
					</Notification>
				</Container>
				<Footer/>
			</div>
		);
	}
}

export default Homepage;