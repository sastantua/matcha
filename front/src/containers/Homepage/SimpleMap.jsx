import React, { Component } from 'react';
import styled from "styled-components"
import GoogleMapReact from 'google-map-react';
import { COLORS } from '../../config/style'

// import usePosition from '../../hooks/usePosition'

// const MapContainer = styled.div`
// 	@media ${device.mobileS} {
// 		height: 82vh;
// 		margin-top: 10vh;
// 		margin-bottom: 8vh;
// 	}
// 	@media ${device.tablet} {
// 		height: 85vh;
// 		margin-top: 10vh;
// 		margin-bottom: 5vh;
// 	}
// 	height: 85vh;
// 	margin-top: 10vh;
// 	margin-bottom: 5vh;
// `

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
	// const position = usePosition();
	
	static defaultProps = {
		center: {
			lat: 48.897443,
			lng: 2.318489
		},
		zoom: 11
	};
	
	render() {
		return (
			// Important! Always set the container height explicitly
				<GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom} >
					<AnyReactComponent lat={48.897443} lng={2.318489} text="Loading"/>
				</GoogleMapReact>
		);
	}
}

export default SimpleMap;
// bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }} should be right under GoogleMapReact component
