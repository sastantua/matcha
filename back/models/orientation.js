import { mode, session, closeBridge } from '../middleware/session'

export const initOrientations = async (orientations) => {
	const dbSession = session(mode.WRITE);
	
	let values = ''
	for (let orientation of orientations) {
		values += `, (g${Math.round(Math.random() * 100)}:Orientation {_id: "${orientation._id}", name: "${orientation.name}"})`;
	}
	values = values.substring(2);
	const query = `CREATE ${values}`

	await dbSession.session.run(query).then(res => closeBridge(dbSession))
	.catch (e => console.log(e));
}

export const retriveOrientations = async () => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (o:Orientation) RETURN o';

	const Orientations = []
	await dbSession.session.run(query).then(res => {
		res.records.forEach(record => {
			let {_id, name} = record._fields[0].properties;
			let orientation = {_id, name};
			Orientations.push(orientation);
		});
		closeBridge(dbSession);
	}).catch (e => console.log(e));
	return Orientations;
}

export const getOrientation = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User)-[:ATTRACT]-(o) WHERE u._id = $_id RETURN o';
	const orientation =  await dbSession.session.run(query, {_id: user._id}).then(res => {
		closeBridge(dbSession)
		if (res.records.length) {
			let {_id, name} = res.records[0]._fields[0].properties;
			const orientation = {_id, name};
			return orientation;
		}
		return false;
	}).catch (e => console.log(e));
	return orientation;
}

export const setOrientation = async (user, orientationId) => {
	const dbSession = session(mode.WRITE);
	const query = 'MATCH (u:User) WHERE u._id = $userId MATCH (o:Orientation) WHERE g._id = $orientationId CREATE (o)-[:ATTRACT]->(u)';
	await dbSession.session.run(query, {userId: user._id, orientationId: orientationId}).then(res => closeBridge(dbSession))
	.catch (e => console.log(e));
}

export const verifyOrientation = async (orientation_id) => {
	const orientations = await retriveOrientations();
	for (let orientation of orientations) {
		if (orientation._id == orientation_id) return true;
	}
	return false;
}