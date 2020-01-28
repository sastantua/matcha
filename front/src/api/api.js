import axios from 'axios';

const api = axios.create({
	baseURL: 'http://matchapi.guillaumerx.fr',
	headers: {'Access-Control-Allow-Origin': '*'}
});

// username: neo4j
// password: 42
// bolt://matchapi.guillaumerx.fr:7687
// http://167.172.168.207:7474
// http://167.172.168.207:7474/browser/

export default api;