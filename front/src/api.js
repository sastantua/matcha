import axios from 'axios';

const api = axios.create({
	baseURL: 'http://167.172.168.207:3000'
});

export default api;