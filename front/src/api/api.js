import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL});



/*

SSH DB:
	ssh root@matchapi.guillaumerx.fr && cd matcha/back && docker-compose up

Credential Neo4j
	username: neo4j
	password: 42
	bolt://matchapi.guillaumerx.fr:7687
	
	http://167.172.168.207:7474
	http://167.172.168.207:7474/browser/

Crediential Test: 
	username: guillaumeroux123@gmail.com
	password: Guillaume-123

Basic Request in Neo4j:
	MATCH (n)-[r]-() DELETE n,r
	MATCH (u:User) WHERE u.username = 'guroux' RETURN u
	MATCH (u:User)-[:PIC]-(p) WHERE u.username = "guroux" RETURN u,p


doc https://stoplight.io/p/docs/gh/guillaumerx/matcha/reference/Base-API.v1.yaml


*/

export default api;