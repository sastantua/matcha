import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL});

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


// guillaumeroux123@gmail.com
// Guillaume-123

// ssh root@matchapi.guillaumerx.fr && cd matcha/back && docker-compose up
// username: neo4jpassword: 42
// bolt://matchapi.guillaumerx.fr:7687
// http://167.172.168.207:7474
// http://167.172.168.207:7474/browser/
// match (n)-[r]-() delete n,r

// doc https://stoplight.io/p/docs/gh/guillaumerx/matcha/reference/Base-API.v1.yaml

export default api;