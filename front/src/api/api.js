import axios from 'axios';

const api = axios.create({ baseURL: 'http://matchapi.guillaumerx.fr' });

// headers: {'Access-Control-Allow-Origin': '*'}

// const config = {
//     headers: { Authorization: `Bearer ${token}` }
// };

// const args = {
//    a: "a",
//    b: "b",
//    c: "c",
//    d: "d",
//    e: "e"
// };

// Axios.post( 
//   '/router/....',
//   args,
//   config
// ).then(console.log('then')).catch(console.log('catch'));

// username: neo4j
// password: 42
// bolt://matchapi.guillaumerx.fr:7687
// http://167.172.168.207:7474
// http://167.172.168.207:7474/browser/

export default api;