import googleMap from '@google/maps';

function localisation() {
	const googleMapClient = googleMap.createClient({
		key: process.env.API_KEY_ONE
	})
	
	return (googleMapClient.geocode);
}

export default localisation;
{/* <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvJEoVFP63mPRdV0IMEFfYYrzBetap-cs&callback=initMap" type="text/javascript"></script> */}