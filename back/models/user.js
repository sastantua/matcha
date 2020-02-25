import uuidv1 from 'uuid/v1';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { Date } from 'neo4j-driver'

import { mode, session, closeBridge } from '../middleware/session';
import { toBirthdate } from './match';
import { makeQuery } from './utils';
import { getOrientation } from './orientation';
import { getHobbies } from './hobby';
import { getGender } from './gender';

export const userExists = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User) WHERE u.email = $email OR u.username = $username RETURN u';
	return await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession);
		return res.records.length ? true : false
	}).catch(e => {
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
	}).catch(e => {
		console.log(e);
	})

	return user._id;
}

export const verifyUser = async (_id, token) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User)-[:AUTH]-(t:Token) WHERE u._id = $_id AND t.token = $token RETURN u';
	return await dbSession.session.run(query, { _id, token }).then(res => {
		closeBridge(dbSession);
		if (res.records.length) {
			let { _id, username, firstname, lastname, email, biography, birthdate } = res.records[0]._fields[0].properties;
			const user = { _id, username, firstname, lastname, email, biography, birthdate };
			return user;
		}
		else
			return false
	}).catch(e => {
		console.log(e);
	})
}

export const findByCreditentials = async (email, password) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User) WHERE u.email = $email RETURN u';
	const user = await dbSession.session.run(query, { email, password }).then(res => {
		closeBridge(dbSession);
		if (res.records.length) {
			let { _id, username, firstname, lastname, email, biography, birthdate, password } = res.records[0]._fields[0].properties;
			const user = { _id, username, firstname, lastname, email, biography, birthdate, password };
			return user;
		}
		return null;
	}).catch(e => {
		console.log(e);
	})
	if (!user || !await bcrypt.compare(password, user.password))
		return false;
	else {
		delete user.password;
		return user;
	}
}

export const getToken = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User)-[a:AUTH]-(t) WHERE u._id = $_id RETURN t';
	return await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession);
		if (res.records.length) {
			let { token } = res.records[0]._fields[0].properties;
			return token
		}
		return null;
	}).catch(e => {
		console.log(e);
	})
}

export const generateAuthToken = async (user) => {
	const dbSession = session(mode.WRITE);
	const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
	const query = 'MATCH (u:User) WHERE u._id = $_id CREATE (t:Token {token: $token}) MERGE (u)-[:AUTH]->(t)';

	await dbSession.session.run(query, { _id: user._id, token: token }).then(res => closeBridge(dbSession))
		.catch(e => console.log(e));

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
			let { _id, username, firstname, lastname, email, birthdate, biography } = res.records[0]._fields[0].properties;
			const user = { _id, username, firstname, lastname, email, birthdate, biography };
			return user;
		})
		.catch(e => console.log(e));
}

export const setLocation = async (user, location) => {
	const dbSession = session(mode.WRITE);
	const userLocation = await getLocation(user);

	if (userLocation) {
		const query = 'MATCH (u:User)-[:LOCATION]-(l) WHERE u._id = $_id SET l += {lat: $lat, lng: $lng} RETURN l';
		return await dbSession.session.run(query, { _id: user._id, lat: location.lat, lng: location.lng }).then(res => {
			closeBridge(dbSession);
			let { lat, lng } = res.records[0]._fields[0].properties;
			const location = { lat, lng };
			return location;
		}).catch(e => console.log(e));
	} else {
		const query = 'MATCH (u:User) WHERE u._id = $_id CREATE (l:Location {lat: $lat, lng: $lng}) MERGE (u)-[:LOCATION]->(l) RETURN l';
		return await dbSession.session.run(query, { _id: user._id, lat: location.lat, lng: location.lng }).then(res => {
			closeBridge(dbSession);
			let { lat, lng } = res.records[0]._fields[0].properties;
			const location = { lat, lng };
			return location;
		}).catch(e => console.log(e));
	}
}

export const getLocation = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User)-[:LOCATION]-(l) WHERE u._id = $_id RETURN l';
	return await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession)
		if (res.records.length) {
			let { lat, lng } = res.records[0]._fields[0].properties;
			const location = { lat, lng };
			return location;
		}
		return false;
	}).catch(e => console.log(e));
}

export const logoutUser = async (token) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (t:Token) WHERE t.token = $token MATCH (t)-[a]-() DELETE t, a';
	await dbSession.session.run(query, { token }).then(res => closeBridge(dbSession))
		.catch(e => console.log(e));
}

export const logoutAll = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User) WHERE u._id = $_id MATCH (u)-[a:AUTH]-(t) DELETE t, a';
	await dbSession.session.run(query, { _id: user._id }).then(res => closeBridge(dbSession))
		.catch(e => console.log(e));
}

export const verifyPicture = async (user, picture_id) => {
	const pictures = await getPictures(user);

	for (let picture of pictures) {
		console.log(picture);
		if (picture_id == picture._id) return picture.name;
	}
	return false;
}

export const getPictures = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User) WHERE u._id = $_id MATCH (u)-[:PIC]-(p) RETURN p';
	const pictures = await dbSession.session.run(query, { _id: user._id }).then(res => {
		closeBridge(dbSession);
		const pictures = [];
		if (res.records.length) {
			for (let record of res.records) {
				let { _id, url, name, isPP } = record._fields[0].properties;
				const picture = { _id, url, name, isPP };
				pictures.push(picture);
			}
			return pictures;
		}
	}).catch(e => console.log(e));

	return pictures;
}

export const savePicture = async (user, picture_url, picture_name) => {
	const dbSession = session(mode.WRITE);
	const values = { _uid: user._id, _id: uuidv1(), url: picture_url, name: picture_name };
	const query = 'MATCH (u:User) WHERE u._id = $_uid CREATE (p:Picture {_id: $_id, url: $url, name: $name, isPP: false}) MERGE (p)-[:PIC]->(u) RETURN p';

	const picture = await dbSession.session.run(query, values).then(res => {
		closeBridge(dbSession)
		const { _id, url, name, isPP } = res.records[0]._fields[0].properties;
		const picture = { _id, url, name, isPP }
		return picture
	}).catch(e => console.log(e));

	return picture;
}

const pictureExists = (pictures, picture_id) => {
	for (let picture of pictures) {
		if (picture._id == picture_id) return true;
	}
	return false;
}

const userHasProfilePicture = (pictures) => {
	for (let picture in pictures) {
		if (picture.isPP) return picture._id
	}
	return false
}

const unsetPicture = async (picture_id) => {
	const dbSession = session(mode.WRITE);
	const query = 'MATCH (p:Picture) WHERE p._id = $picture_id SET p += {isPP: false}';
	
	await dbSession.session.run(query, { picture_id }).then(res => closeBridge(dbSession))
	.catch(e => console.log(e));
}

const setPicture = async (picture_id) => {
	const dbSession = session(mode.WRITE);
	const query = 'MATCH (p:Picture) WHERE p._id = $picture_id SET p += {isPP: true}';
	
	await dbSession.session.run(query, { picture_id }).then(res => closeBridge(dbSession))
	.catch(e => console.log(e));
}

export const setAsProfilePicture = async (user, picture_id) => {
	const pictures = await getPictures(user);
	if (!pictureExists(pictures, picture_id)) return false;
	const actualPicture = userHasProfilePicture(pictures);

	if (actualPicture) await unsetPicture(actualPicture);
	await setPicture(picture_id);

	return true;
}

export const deletePicture = async (picture_id) => {
	const dbSession = session(mode.WRITE);
	const query = 'MATCH (p:Picture)-[r:PIC]-() WHERE p._id = $_id DELETE p,r ';
	await dbSession.session.run(query, { _id: picture_id }).then(res => closeBridge(dbSession))
		.catch(e => console.log(e));
}

export const getPopularityScore = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH ()-[l:LOVE]->(u:User) WHERE u._id = $_id RETURN count(l)';
	let score = await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession)
		return res.records[0]._fields[0].toNumber();
	}).catch(e => console.log(e));

	return score / 100;
}

const cleanList = (users, gender, orientation) => {
	switch (orientation) {
		case 'straight' :
			if (gender == 'male') users = users.filter(user => user.gender.name === 'female');
			if (gender == 'female') users = users.filter(user => user.gender.name === 'male');
			break;
		case 'gay' :
			if (gender == 'male') users = users.filter(user => user.gender.name === 'male');
			if (gender == 'female') users = users.filter(user => user.gender.name === 'female');
	}
	return users;
}

export const getByOrientation = async (user) => {
	const dbSession = session(mode.READ);
	const orientation = await getOrientation(user);
	const gender = await getGender(user);
	const query =
	`MATCH (u:User)-[:ATTRACT]-(o) WHERE o._id = $orientation RETURN u`
	var users = await dbSession.session.run(query, {orientation: orientation._id}).then(res => {
		closeBridge(dbSession)
		let users = []
		res.records.map(record => {
			let user = undefined;
			record._fields.map(field => {
				switch (field.labels[0]) {
					case 'User' :
						user = field.properties;
						break;
					default :
						user[field.labels[0].toLowerCase()] = field.properties;
				}
				users.push(user);
			});
		})
		return users;
	}).catch(e => console.log(e));
	for (let aUser of users) {
		aUser.gender = await getGender(aUser);
		aUser.hobbies = await getHobbies(aUser);
		aUser.pictures = await getPictures(aUser);
	}
	users = cleanList(users, gender.name, orientation.name);
	console.log(users);
}

export const sortByParams = (users, params) => {
	if (params.age) {
		const minBirthdate = toBirthdate(params.age.min);
		const maxBirthdate = toBirthdate(params.age.max);
		users = users.filter(user => minBirthdate >= user.birthdate >= maxBirthdate);
	}
	if (params.popularity) {
		users = users.filter(user => params.popularity.min >= user.popularity >= params.popularity.max);
	}
}