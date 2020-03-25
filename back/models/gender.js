import { mode, session, closeBridge } from '../middleware/session'

export const initGenders = async (genders) => {
	const dbSession = session(mode.WRITE);
	
	let values = ''
	for (let gender of genders) {
		values += `, (g${Math.round(Math.random() * 100)}:Gender {_id: "${gender._id}", name: "${gender.name}"})`;
	}
	values = values.substring(2);
	const query = `CREATE ${values}`

	await dbSession.session.run(query).then(res => closeBridge(dbSession))
	.catch (e => console.log(e));
}

export const retriveGenders = async () => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (g:Gender) RETURN g';

	const Genders = []
	await dbSession.session.run(query).then(res => {
		res.records.forEach(record => {
			let {_id, name} = record._fields[0].properties;
			let gender = {_id, name};
			Genders.push(gender);
		});
		closeBridge(dbSession);
	}).catch (e => console.log(e));
	return Genders;
}

export const getGender = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User)-[:TYPE]-(g) WHERE u._id = $_id RETURN g';
	const gender =  await dbSession.session.run(query, {_id: user._id}).then(res => {
		closeBridge(dbSession)
		if (res.records.length) {
			let {_id, name} = res.records[0]._fields[0].properties;
			const gender = {_id, name};
			return gender;
		}
		return false;
	}).catch (e => console.log(e));
	return gender;
}

export const setGender = async (user, genderId) => {
	const dbSession = session(mode.WRITE);
	const query = 'MATCH (u:User) WHERE u._id = $userId MATCH (g:Gender) WHERE g._id = $genderId CREATE (u)-[:TYPE]->(g)';
	await dbSession.session.run(query, {userId: user._id, genderId: genderId}).then(res => closeBridge(dbSession))
	.catch (e => console.log(e));
}

export const verifyGender = async (gender_id) => {
	const genders = await retriveGenders();
	for (let gender of genders) {
		if (gender._id == gender_id) return true;
	}
	return false;
}