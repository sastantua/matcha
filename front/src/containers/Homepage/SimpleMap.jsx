import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import usePosition from '../../hooks/usePosition'

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
			<div style={{ height: '82vh', width: '100%' }}>
				<GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom} >
					<AnyReactComponent lat={48.897443} lng={2.318489} text="Loading"/>
				</GoogleMapReact>
			</div>
		);
	}
}

export default SimpleMap;
// bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }} should be right under GoogleMapReact component
