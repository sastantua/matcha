import axios from 'axios';

const api = axios.create({
	baseURL: 'http://matchapi.guillaumerx.fr'
});

// username: neo4j
// password: 42
// bolt://matchapi.guillaumerx.fr:7687
// http://167.172.168.207:7474
// http://167.172.168.207:7474/browser/

export default api;