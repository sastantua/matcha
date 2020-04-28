import uuidv1 from 'uuid/v1';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { mode, session, closeBridge } from '../middleware/session';
import { toBirthdate } from './match';
import { distance, score } from './utils';
import { getOrientation } from './orientation';
import { getHobbies } from './hobby';
import { getGender } from './gender';
import { registerMail, passwordMail } from './mail';
import { initChat } from './chat';

export const regex = {
	email: new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g),
	username: new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm),
	password: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
	name: new RegExp(/^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/)
}

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
	const query = 'CREATE (u:User { _id: $_id, username: $username, firstname: $firstname, lastname: $lastname, email: $email, password: $password, activated: false })';
	await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession);
	}).catch(e => {
		console.log(e);
	})
	return user._id;
}

export const activateAccount = async (token) => {
	const dbSession = session(mode.READ);
	var query = 'MATCH (u:User)-[:TOKEN]-(m:Mail) WHERE m.token = $token RETURN u,m';
	const user = await dbSession.session.run(query, { token }).then(res => {
		if (res.records.length) {
			let user = res.records[0]._fields[0].properties;
			user.token = res.records[0]._fields[1].properties.token;
			return user
		}
		return false;
	}).catch(e => {
		console.log(e);
	})
	if (user && token == user.token) {
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		if (decoded.email == user.email) {
			query = 'MATCH (u:User)-[t:TOKEN]-(m) WHERE u.email = $email SET u += { activated: true } DETACH DELETE t,m';
			await dbSession.session.run(query, user).then(res => {
				closeBridge(dbSession);
			}).catch(e => {
				console.log(e);
			})
			return true;
		}
	}
	return false;
}

export const sendActivation = async (user) => {
	const dbSession = session(mode.WRITE);
	user.registerToken = jwt.sign({ email: user.email }, process.env.JWT_KEY);
	const query = 'MATCH (u:User) WHERE u._id = $_id CREATE (m:Mail {token: $registerToken}) MERGE (u)<-[:TOKEN]-(m)';
	await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession);
	}).catch(e => {
		console.log(e);
	})
	registerMail(user);
}

export const verifyUser = async (_id, token) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User)-[:AUTH]-(t:Token) WHERE u._id = $_id AND t.token = $token RETURN u';
	return await dbSession.session.run(query, { _id, token }).then(res => {
		closeBridge(dbSession);
		if (res.records.length) {
			let { _id, username, firstname, lastname, email, biography, birthdate, proximity, password } = res.records[0]._fields[0].properties;
			const user = { _id, username, firstname, lastname, email, biography, birthdate, proximity, password };
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
			let { _id, username, firstname, lastname, email, biography, birthdate, activated, proximity, password } = res.records[0]._fields[0].properties;
			const user = { _id, username, firstname, lastname, email, biography, birthdate, activated, proximity, password };
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

export const editPassword = async (user, password) => {
	const dbSession = session(mode.WRITE);
	const hash = await bcrypt.hash(password, 8);
	const query = 'MATCH (u:User) WHERE u._id = $_id SET u += {password: $hash}';

	await dbSession.session.run(query, { _id: user._id, hash }).then(res => closeBridge(dbSession))
		.catch(e => console.log(e));
}

export const requestPassword = async (email) => {
	const dbSession = session(mode.WRITE);
	var query = `MATCH (u:User) WHERE u.email = $email
	OPTIONAL MATCH (u)-[r:RESET]-(m)
	RETURN u,r `;
	const user = await dbSession.session.run(query, { email })
	.then(res => {
		if (res.records.length) {
			let user = res.records[0]._fields[0].properties;
			if (res.records[0]._fields[1]) return false;
			return user
		}
		return false;
	})
	.catch(e => console.log(e));
	if (user) {
		user.token = jwt.sign({ email: user.email }, process.env.JWT_KEY);
		query = `MATCH (u:User) WHERE u._id = $_id CREATE (m:Mail {token: $token}) MERGE (u)-[:RESET]-(m)`
		await dbSession.session.run(query, user)
		.then(res => {
			closeBridge(dbSession)
		}).catch(e => console.log(e));
		passwordMail(user);
	}
}

export const changePassword = async (password, token) => {
	const dbSession = session(mode.WRITE);
	const hash = await bcrypt.hash(password, 8)
	const query = 'MATCH (u:User)-[r:RESET]-(m:Mail) WHERE m.token = $token SET u += {password: $hash} DETACH DELETE m,r RETURN u';

	return await dbSession.session.run(query, {token, hash}).then(res => {
		closeBridge(dbSession);
		if (res.records.length) return true;
		return false;
	})
	.catch(e => console.log(e));
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
			let { _id, username, firstname, lastname, email, birthdate, biography, proximity } = res.records[0]._fields[0].properties;
			const user = { _id, username, firstname, lastname, email, birthdate, biography, proximity };
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
		}
		return pictures;
	}).catch(e => console.log(e));

	return pictures;
}

export const savePicture = async (user, picture_url, picture_name) => {
	const dbSession = session(mode.WRITE);
	const isPP = !await userHasProfilePicture(await getPictures(user));
	const values = { _uid: user._id, _id: uuidv1(), url: picture_url, name: picture_name, isPP: isPP };
	const query = 'MATCH (u:User) WHERE u._id = $_uid CREATE (p:Picture {_id: $_id, url: $url, name: $name, isPP: $isPP}) MERGE (p)-[:PIC]->(u) RETURN p';

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
	for (let picture of pictures) {
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

const higherLikeCount = async () => {
	const dbSession = session(mode.READ);
	const query =
	`MATCH (u:User)
	WITH u, SIZE(()-[:LIKE]->(u)) as likeCount
	ORDER BY likeCount DESC LIMIT 1
	RETURN likeCount`
	return await dbSession.session.run(query).then(res => {
		closeBridge(dbSession);
		return res.records[0]._fields[0].toNumber();
	}).catch(e => console.log(e));
}

export const getPopularityScore = async (user) => {
	const higher = await higherLikeCount()
	const point = higher != 0 ? 100 / higher : 100;
	const dbSession = session(mode.READ);
	const query = 'MATCH ()-[l:LOVE]->(u:User) WHERE u._id = $_id RETURN count(l)';
	let likeCount = await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession)
		return res.records[0]._fields[0].toNumber();
	}).catch(e => console.log(e));
	return point * likeCount;
}

export const like = async (user, _id) => {
	const dbSession = session(mode.WRITE);
	const query = 'MATCH (a:User) WHERE a._id = $_id MATCH (b:User) WHERE b._id = $likedId MERGE (a)-[:LOVE {_id: $likeId, date: $date}]->(b)';
	await dbSession.session.run(query, {_id: user._id, likeId: uuidv1(),likedId: _id, date: Date.now()}).then(async res => {
		closeBridge(dbSession)
		if (await likes(user, _id))
			initChat(user, _id);
	}).catch(e => console.log(e));
}

export const unlike = async (user, _id) => {
	const dbSession = session(mode.WRITE);
	const query = 'MATCH (a:User) WHERE a._id = $_id MATCH (b:User) WHERE b._id = $likedId MATCH (a)-[l:LOVE]->(b) DETACH DELETE l';
	await dbSession.session.run(query, {_id: user._id, likedId: _id}).then(res => {
		closeBridge(dbSession)
	}).catch(e => console.log(e));
}

export const isLiked = async (user, _id) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (y:User)-[l:LOVE]->(u:User) WHERE y._id = $_id AND u._id = $u_id RETURN l';
	return await dbSession.session.run(query, {_id: user._id, u_id: _id}).then(res => {
		closeBridge(dbSession);
		if (res.records.length) {
			return true;
		}
		return false
	}).catch(e => console.log(e));
}

export const likes = async (user, _id) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (y:User)<-[l:LOVE]-(u:User) WHERE y._id = $_id AND u._id = $u_id RETURN l';
	return await dbSession.session.run(query, {_id: user._id, u_id: _id}).then(res => {
		closeBridge(dbSession);
		if (res.records.length) {
			return true;
		}
		return false
	}).catch(e => console.log(e));
}

export const getLikes = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (y:User)<-[l:LOVE]-(u:User) WHERE y._id = $_id RETURN u,l';
	let alikes = await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession)
		let likes = []
		res.records.map(record => {
			let like = undefined;
			like = record._fields[1].properties;
			like.user = record._fields[0].properties;
			
			delete like.user.password;
			delete like.user.email;
			likes.push(like);
		})
		return likes;
	}).catch(e => console.log(e));
	for (let like of alikes) {
		like.user.gender = await getGender(like.user);
		like.user.orientation = await getOrientation(like.user);
		like.user.hobbies = await getHobbies(like.user);
		like.user.pictures = await getPictures(like.user);
		like.user.popularity = await getPopularityScore(like.user);
		like.user.location = await getLocation(like.user);
		like.user.likes = await likes(user, like.user);
		like.user.liked = await isLiked(user, like.user);
		like.user.isSeen = await isSeen(user, like.user);
	}
	return alikes;
}

export const getBlocked = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (y:User)-[b:BLOCK]->(u:User) WHERE y._id = $_id RETURN u';
	return await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession)
		let users = []
		res.records.map(record => {
			let user = record._fields[0].properties;
			delete user.password;
			delete user.email;
			users.push(user);
		})
		return users;
	}).catch(e => console.log(e));
}


export const blocks = async (user, _id) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (y:User)-[b:BLOCK]-(u:User) WHERE y._id = $_id AND u._id = $u_id RETURN b';
	return await dbSession.session.run(query, {_id: user._id, u_id: _id}).then(res => {
		closeBridge(dbSession);
		if (res.records.length) {
			return true;
		}
		return false
	}).catch(e => console.log(e));
}

export const block = async (user, _id) => {
	const dbSession = session(mode.WRITE);
	const query = `MATCH (a:User) WHERE a._id = $_id MATCH (b:User) WHERE b._id = $blockId
	OPTIONAL MATCH (a)-[l:LOVE]-(b)
	OPTIONAL MATCH (a)-[s:SAW]-(b)
	MERGE (a)-[:BLOCK]->(b)
	DETACH DELETE l,s`;
	await dbSession.session.run(query, {_id: user._id, blockId: _id}).then(res => {
		closeBridge(dbSession);
	}).catch(e => console.log(e));
}

export const unblock = async (user, _id) => {
	const dbSession = session(mode.WRITE);
	const query = `MATCH (a:User) WHERE a._id = $_id MATCH (b:User) WHERE b._id = $blockId MATCH (a)-[c:BLOCK]->(b) DETACH DELETE c`;
	await dbSession.session.run(query, {_id: user._id, blockId: _id}).then(res => {
		closeBridge(dbSession);
	}).catch(e => console.log(e));
}

export const getSeen = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (y:User)<-[s:SAW]-(u:User) WHERE y._id = $_id RETURN u,s';
	let saw = await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession)
		let saw = []
		res.records.map(record => {
			let seen = undefined;
			seen = record._fields[1].properties;
			seen.user = record._fields[0].properties;
			delete seen.user.password;
			delete seen.user.email;
			saw.push(seen);
		})
		return saw;
	}).catch(e => console.log(e));
	for (let seen of saw) {
		seen.user.gender = await getGender(seen.user);
		seen.user.orientation = await getOrientation(seen.user);
		seen.user.hobbies = await getHobbies(seen.user);
		seen.user.pictures = await getPictures(seen.user);
		seen.user.popularity = await getPopularityScore(seen.user);
		seen.user.location = await getLocation(seen.user);
		seen.user.likes = await likes(user, seen.user);
		seen.user.liked = await isLiked(user, seen.user);
		seen.user.isSeen = await isSeen(user, seen.user);
	}
	return saw;
}

export const alreadySaw = async (user, _id) => {
	const dbSession = session(mode.WRITE);
	const query = `MATCH (a:User) WHERE a._id = $_id MATCH (b:User) WHERE b._id = $sawId MERGE (a)-[s:SAW {date: $date}]->(b)`;
	await dbSession.session.run(query, { _id: user._id, sawId: _id, date: Date.now() }).then(res => {
		closeBridge(dbSession);
	}).catch(e => console.log(e));
}

export const hasSeen = async (user, _id) => {
	const dbSession = session(mode.READ);
	const query = `MATCH (a:User)-[s:SAW]->(b:User) WHERE a._id = $_id AND b._id = $sawId RETURN s`;
	return await dbSession.session.run(query, { _id: user._id, sawId: _id, date: Date.now() }).then(res => {
		closeBridge(dbSession);
		if (res.records.length) return true;
		return false;
	}).catch(e => console.log(e));
}

export const isSeen = async (user, _id) => {
	const dbSession = session(mode.READ);
	const query = `MATCH (a:User)<-[s:SAW]-(b:User) WHERE a._id = $_id AND b._id = $sawId RETURN s`;
	return await dbSession.session.run(query, { _id: user._id, sawId: _id, date: Date.now() }).then(res => {
		closeBridge(dbSession);
		if (res.records.length) return true;
		return false;
	}).catch(e => console.log(e));
}

export const saw = async (user, _id) => {
	const dbSession = session(mode.WRITE);
	const query = `MATCH (a:User) WHERE a._id = $_id MATCH (b:User) WHERE b._id = $sawId MERGE (a)-[s:SAW {date: $date}]->(b)`;
	await dbSession.session.run(query, { _id: user._id, sawId: _id, date: Date.now() }).then(res => {
		closeBridge(dbSession);
	}).catch(e => console.log(e));
}

export const editSaw = async (user, _id) => {
	const dbSession = session(mode.WRITE);
	const query = `MATCH (a:User)-[s:SAW]-(b:User) WHERE a._id = $_id AND b._id = $sawId SET s += {date: $date}`;
	await dbSession.session.run(query, { _id: user._id, sawId: _id, date: Date.now() }).then(res => {
		closeBridge(dbSession);
	}).catch(e => console.log(e));	
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
			break;
		default :
			return users;
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
	for (let key in users) {
		if (!await hasExtendedProfile(users[key]) || await isLiked(user, users[key]._id) || await blocks(user, users[key]._id)) users.splice(key, 1);
	}
	for (let aUser of users) {
		aUser.gender = await getGender(aUser);
		aUser.orientation = await getOrientation(aUser);
		aUser.hobbies = await getHobbies(aUser);
		aUser.pictures = await getPictures(aUser);
		aUser.popularity = await getPopularityScore(aUser);
		aUser.location = await getLocation(aUser);
		aUser.likes = await likes(user, aUser._id);
		aUser.liked = await isLiked(user, aUser._id);
		aUser.isSeen = await isSeen(user, aUser._id);
		delete aUser.password;
		delete aUser.email;
	}
	users = cleanList(users, gender.name, orientation.name);
	return users;
}

export const sortByParams = (loggedUser, users, params) => {
	if (params.age) {
		users = users.filter(user => toBirthdate(params.age.min) >= user.birthdate && user.birthdate >= toBirthdate(params.age.max));
	}
	if (params.popularity) {
		users = users.filter(user => params.popularity.min <= user.popularity && user.popularity <= params.popularity.max);
	}
	if (params.distance) {
		
		users = users.filter(user => distance(loggedUser, user) <= params.distance);
	}
	if (params.hobbies) {
			users = users.filter(user => {
				for (let hobby_id of params.hobbies) {
					for (let hobby of user.hobbies) {
						if (hobby_id === hobby._id) return true;
					}
				}
				return false;
			})
	}
	return users;
}

export const match = async (user) => {
	const hobbies = await getHobbies(user);
	var hobbies_id = [];
	for (let hobby of hobbies) {
		hobbies_id.push(hobby._id);
	}
	const params = {
		distance: user.proximity ? user.proximity : undefined,
		hobbies: hobbies_id
	}
	user.hobbies = hobbies;
	var users = await getByOrientation(user);
	users = sortByParams(user, users, params);
	users.sort((a, b) => score(user, a)score(user, b));
	return users;
}

export const hasExtendedProfile = async (user) => {
	user.gender = await getGender(user);
	user.pictures = await getPictures(user);
	user.hobbies = await getHobbies(user);
	user.location = await getLocation(user);
	if (!user.gender || !user.birthdate || !user.biography || !user.hobbies.length || !user.pictures || !user.location || !user.location.lat || !user.location.lng)
		return false;
	return true;
}