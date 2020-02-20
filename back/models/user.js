import uuidv1 from 'uuid/v1';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { Date } from 'neo4j-driver'

import { mode, session, closeBridge } from '../middleware/session';

export const userExists = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User) WHERE u.email = $email OR u.username = $username RETURN u';
	return await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession);
		return res.records.length ? true : false
	}).catch (e => {
		console.log(e);
	})
}

export const registerUser = async (user) => {
	const dbSession = session(mode.WRITE);
	user.password = await bcrypt.hash(user.password, 8)
	user._id = uuidv1();
	const query = 'CREATE (u:User { _id: $_id, username: $username, firstname: $firstname, lastname: $lastname, email: $email, password: $password })';
	dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession);
	}).catch (e => {
		console.log(e);
	})
}

export const verifyUser = async (_id, token) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User)-[:AUTH]-(t:Token) WHERE u._id = $_id AND t.token = $token RETURN u';
	return await dbSession.session.run(query, {_id, token}).then(res => {
		closeBridge(dbSession);
		if (res.records.length) {
			let {_id, username, firstname, lastname, email, biography, birthdate} = res.records[0]._fields[0].properties;
			const user = {_id, username, firstname, lastname, email, biography, birthdate};
			return user;
		}
		else
			return false
	}).catch (e => {
		console.log(e);
	})
}

export const findByCreditentials = async (email, password) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User) WHERE u.email = $email RETURN u';
	const user = await dbSession.session.run(query, {email, password}).then(res => {
		closeBridge(dbSession);
		if (res.records.length)
		{
			let {_id, username, firstname, lastname, email, biography, birthdate, password} = res.records[0]._fields[0].properties;
			const user = {_id, username, firstname, lastname, email, biography, birthdate, password};
			return user;
		}
		return null;
	}).catch (e => {
		console.log(e);
	})
	if (!user || !await bcrypt.compare(password, user.password))
		return false;
	else
	{
		delete user.password;
		return user;
	}
}

export const getToken = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User)-[a:AUTH]-(t) WHERE u._id = $_id RETURN t';
	return await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession);
		if (res.records.length)
		{
			let { token } = res.records[0]._fields[0].properties;
			return token
		}
		return null;
	}).catch (e => {
		console.log(e);
	})
} 

export const generateAuthToken = async (user) => {
	const dbSession = session(mode.WRITE);
	const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
	const query = 'MATCH (u:User) WHERE u._id = $_id CREATE (t:Token {token: $token}) MERGE (t)-[:AUTH]->(u)';
	
	await dbSession.session.run(query, {_id: user._id, token: token}).then(res => closeBridge(dbSession))
	.catch (e => console.log(e));
	
	return token
}

export const editUser = async (user) => {
	const dbSession = session(mode.WRITE);
	var values = "";
	for (var key in user) {
		if (user[key] !== null && user[key] != "" && key != '_id') values += `, ${key}: $${key}`;
	}
	values = values.substring(2);
	const query = `MATCH (u:User) WHERE u._id = $_id SET u += {${values}} RETURN u`;
	return await dbSession.session.run(query, user)
	.then(res => {
		closeBridge(dbSession);
		let {_id, username, firstname, lastname, email, birthdate, biography} = res.records[0]._fields[0].properties;
		const user = {_id, username, firstname, lastname, email, birthdate, biography};
		return user;
	})
	.catch (e => console.log(e));
}

export const setLocation = async (user, location) => {
	const dbSession = session(mode.WRITE);
	const userLocation = await getLocation(user);
	
	if (userLocation) {
		const query = 'MATCH (u:User)-[:LOCATION]-(l) WHERE u._id = $_id SET l += {lat: $lat, lng: $lng} RETURN l';
		return await dbSession.session.run(query, {_id: user._id, lat: location.lat, lng: location.lng}).then(res => {
			closeBridge(dbSession);
			let {lat, lng} = res.records[0]._fields[0].properties;
			const location = {lat, lng};
			return location;
		}).catch (e => console.log(e));
	} else {
		const query = 'MATCH (u:User) WHERE u._id = $_id CREATE (l:Location {lat: $lat, lng: $lng}) MERGE (u)-[:LOCATION]->(l) RETURN l';
		return await dbSession.session.run(query, {_id: user._id, lat: location.lat, lng: location.lng}).then(res => {
			closeBridge(dbSession);
			let {lat, lng} = res.records[0]._fields[0].properties;
			const location = {lat, lng};
			return location;
		}).catch (e => console.log(e));
	}
}

export const getLocation = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User)-[:LOCATION]-(l) WHERE u._id = $_id RETURN l';
	return await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession)
		if (res.records.length) {
			let {lat, lng} = res.records[0]._fields[0].properties;
			const location = {lat, lng};
			return location;
		}
		return false;
	}).catch (e => console.log(e));
}

export const logoutUser = async (token) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (t:Token) WHERE t.token = $token MATCH (t)-[a]-() DELETE t, a';
	await dbSession.session.run(query, {token}).then(res => closeBridge(dbSession))
	.catch (e => console.log(e));
}

export const logoutAll = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User) WHERE u._id = $_id MATCH (u)-[a:AUTH]-(t) DELETE t, a';
	await dbSession.session.run(query, {_id: user._id}).then(res => closeBridge(dbSession))
	.catch (e => console.log(e));
}

export const verifyPicture = async (user, picture_id) => {
	const pictures= await getPictures(user);

	for (let picture of pictures) {
		console.log(picture);
		if (picture_id == picture._id) return picture.name;
	}
	return false;
}

export const getPictures= async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User) WHERE u._id = $_id MATCH (u)-[:PIC]-(p) RETURN p';
	const pictures = await dbSession.session.run(query, {_id: user._id}).then(res => {
		closeBridge(dbSession);
		const pictures = [];
		if (res.records.length) {
			for (let record of res.records) {
				let {_id, url, name} = record._fields[0].properties;
				const picture = {_id, url, name};
				pictures.push(picture);
			}
			return pictures;
		}
	}).catch (e => console.log(e));

	return pictures;
}

export const savePicture = async (user, picture_url, picture_name) => {
	const dbSession = session(mode.WRITE);
	const values = { _uid: user._id, _id: uuidv1(), url: picture_url, name: picture_name };
	const query = 'MATCH (u:User) WHERE u._id = $_uid CREATE (p:Picture {_id: $_id, url: $url, name: $name}) MERGE (p)-[:PIC]->(u) RETURN p';

	const picture = await dbSession.session.run(query, values).then(res => {
		closeBridge(dbSession)
		const { _id, url, name } = res.records[0]._fields[0].properties;
		const picture = { _id, url, name }
		return picture
	}).catch (e => console.log(e));
	
	return picture;
}

export const deletePicture = async (picture_id) => {
	const dbSession = session(mode.WRITE);
	const query = 'MATCH (p:Picture)-[r:PIC]-() WHERE p._id = $_id DELETE p,r ';
	await dbSession.session.run(query, {_id: picture_id}).then(res => closeBridge(dbSession))
	.catch (e => console.log(e));
}

export const getPopularityScore = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH ()-[l:LOVE]->(u:User) WHERE u._id = $_id RETURN count(l)';
	let score = await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession)
		return res.records[0]._fields[0].toNumber();
	}).catch (e => console.log(e));

	return score / 100;
}