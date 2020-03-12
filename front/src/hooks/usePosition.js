import { useState, useEffect } from 'react';
import localisation from './locationGoogle';
import axios from 'axios'

export const usePosition = () => {
	const [position, setPosition] = useState({});
	const [error, setError] = useState(null);

	const getIp = new Promise((s, f) => {
		axios.get('https://www.cloudflare.com/cdn-cgi/trace')
		.then(res => s(res.data.ip))
		.catch(err => f(err))
	})

	const getLocation = (ip) => {
		return new Promise((s, f) => {
			axios.get(`http://api.ipstack.com/${ip}?access_key=32340123d14b195dc9a8865d9d53de09&format=1`)
			.then(res => s({latitude: res.data.latitude, longitude: res.data.longitude}))
			.catch(err => f(err))
		})
	}

	const locationFromIp = () => {
		getIp.then(ip => {
			getLocation(ip)
			.then(location => setPosition(location))
			.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
	}

	const onChange = ({coords}) => {
		setPosition({
			latitude: coords.latitude,
			longitude: coords.longitude,
		});
	};
	
	const onError = (error) => {
		console.log("locationFromIp from onError")
		locationFromIp();
		// if (error.code == error.PERMISSION_DENIED)
    	// console.log("you denied me :-(");
		// setError(error.message);
	};

	useEffect(() => {
		console.log("navigator is blocked");
		
		if (!navigator.geolocation) {
			console.log("locationFromIp from useEffect")
			locationFromIp();
			setError('Geolocation is not supported');
			return ;
		}
		const watcher = navigator.geolocation.watchPosition(onChange, onError);
		return () => navigator.geolocation.clearWatch(watcher);
	}, []);
	
	return {...position, error};
}


// const locationFromIp = () => {
// 	let ip = undefined;
// 	axios.get('https://www.cloudflare.com/cdn-cgi/trace')
// 	.then(res => ip = res.data.ip)
// 	.catch(err => console.log(err))
// 	.then(() => {
// 		console.log("ip", ip);
// 		axios.get(`http://api.ipstack.com/${ip}?access_key=32340123d14b195dc9a8865d9d53de09&format=1`)
// 		.then(res => {
// 			const {latitude, longitude} = res.data;
// 			setPosition({latitude, longitude});
// 		})
// 		.catch(err => console.log(err))
// 	})
// }
