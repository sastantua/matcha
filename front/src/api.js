import axios from 'axios';

const api = axios.create({
	baseURL: 'http://167.172.168.207:3000'
});

// username: neo4j
// password: 42
// http://167.172.168.207:7474
// http://167.172.168.207:7474/browser/

export default api;