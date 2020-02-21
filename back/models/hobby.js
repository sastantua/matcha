import { mode, session, closeBridge } from '../middleware/session';
import uuidv1 from 'uuid/v1';

export const initHobbies = async (hobbys) => {
	const dbSession = session(mode.WRITE);
	
	let values = ''
	for (let hobby of hobbys) {
		values += `, (g${Math.round(Math.random() * 100)}:Hobby {_id: "${hobby._id}", name: "${hobby.name}"})`;
	}
	values = values.substring(2);
	const query = `CREATE ${values}`

	await dbSession.session.run(query).then(res => closeBridge(dbSession))
	.catch (e => console.log(e));
}

export const retriveHobbies = async () => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (h:Hobby) RETURN h';

	const Hobbies = []
	await dbSession.session.run(query).then(res => {
		res.records.forEach(record => {
			let {_id, name} = record._fields[0].properties;
			let hobby = {_id, name};
			Hobbies.push(hobby);
		});
		closeBridge(dbSession);
	}).catch (e => console.log(e));
	return Hobbies;
}

export const verifyHobbies = async (hobbies) => {
	const dbHobbies = await retriveHobbies();
	var found = false;
	
	for (let hobby of hobbies) {
		found = false;
		for (let dbHobby of dbHobbies) {
			if (hobby == dbHobby._id) found = true;
		}
		if (!found) return false;
	}
	return true;
}

export const userHasHooby = async (user, hobby_id) => {
	const userHobbies = await getHobbies(user);
	
	for (let hobby of userHobbies) {
		if (hobby._id = hobby_id) return true;
	}

	return false;
}

export const getHobbies = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User)-[:LIKE]-(h) WHERE u._id = $_id RETURN h';
	const hobbies =  await dbSession.session.run(query, {_id: user._id}).then(res => {
		closeBridge(dbSession)
		const hobbies = [];
		if (res.records.length) {
			for (let record of res.records) {
				let {_id, name} = record._fields[0].properties;
				const hobby = {_id, name};
				hobbies.push(hobby);
			}
			return hobbies;
		}
		return false;
	}).catch (e => console.log(e));
	return hobbies;
}

export const getHobby = async (name) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (h:Hobby) WHERE h.name = $name RETURN h';
	const hobby =  await dbSession.session.run(query, {name}).then(res => {
		closeBridge(dbSession)
		if (res.records.length) {
			const {_id, name} = res.records[0]._fields[0].properties;
			const hobby = {_id, name};
			return hobby;
		}
		return false;
	}).catch (e => console.log(e));
	return hobby;
}

export const setHobbies = async (user, hobbies) => {
	const dbSession = session(mode.WRITE);
	const query = 'MATCH (u:User) WHERE u._id = $userId MATCH (h:Hobby) WHERE h._id = $hobbyId CREATE (h)-[:LIKE]->(u)';
	const dbHobbies = await getHobbies(user);
	var found = false;

	for (let hobby of hobbies) {
		found = false;
		if (dbHobbies.length) {
			for (let dbHobby of dbHobbies) {
				if (hobby == dbHobby._id) found = true;
			}
		}
		if (!found) {
			await dbSession.session.run(query, {userId: user._id, hobbyId: hobby})
			.catch (e => console.log(e));
		}
	}
	closeBridge(dbSession);
}

export const unsetHobby = async (user, hobby_id) => {
	const dbSession = session(mode.WRITE);
	const query = 'MATCH (u: User)-[r:LIKE]-(h:Hobby) WHERE h._id = $hobby_id AND u._id = $user_id DELETE r ';
	await dbSession.session.run(query, {hobby_id: hobby_id, user_id: user._id}).then(res => closeBridge(dbSession))
	.catch (e => console.log(e));
}

export const addHobby = async (hobby) => {
	const dbSession = session(mode.WRITE);
	const query = 'CREATE (h:Hobby {_id: $_id, name: $name}) RETURN h';
	const hobbies = await retriveHobbies();

	for (let key in hobbies) {
		let dbHobby = hobbies[key];
		if (dbHobby.name.toLowerCase() == hobby.toLowerCase()) return await getHobby(dbHobby.name);
	}
	let newHobby = {_id: uuidv1(), name: hobby};
	const Hobby = await dbSession.session.run(query, newHobby).then(res => {
		closeBridge(dbSession);
		const {_id, name} = res.records[0]._fields[0].properties;
		const hobby = {_id, name};
		return hobby;
	}).catch (e => console.log(e));

	return Hobby;
}