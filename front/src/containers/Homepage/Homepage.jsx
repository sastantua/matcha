import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import logo from '../../media/frogs.jpg';
import SimpleMap from './SimpleMap';
import './Homepage.css';

function Homepage() {
	let windowWidth = window.innerWidth;
	if (windowWidth >= 1024) {
		return (
			<div id="homepage-large">
				<Header/>
					<div id="homepage-main-container">
						<h1>Matcha</h1>
						<p>Protect yourself</p>
						<img src={logo} alt="funnypic"/>
					</div>
				<Footer/>
			</div>
		);
	}
	else if (windowWidth >= 720) {
		return (
			<div id="homepage-medium">
				<Header/>
					<div id="homepage-main-container">
						<h1>Matcha</h1>
						<p>Protect yourself</p>
						<img src={logo} alt="funnypic"/>
					</div>
				<Footer/>
			</div>
		);
	
	}
	else {
		return (
			<div id="homepage-small">
				<Header/>
				<div id="homepage-main-container">
					<h1>Matcha</h1>
					<p>Protect yourself</p>
					<img src={logo} alt="funnypic"/>
					<SimpleMap/>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Homepage;