import uuidv1 from 'uuid/v1';
import { mode, session, closeBridge } from '../middleware/session';

export const saveNotification = async (notification) => {
	const dbSession = session(mode.WRITE);
	const query = 'MATCH (u:User) WHERE u._id = $to CREATE (n:Notification {_id: $_id, type: $type, from: $from, timestamp: $date})-[:NOTIFY]->(u)';
	notification.date = new Date().toDateString();
	notification._id = uuidv1();
	await dbSession.session.run(query, notification).then(() => {
		closeBridge(dbSession);
	})
	.catch(e => {
	console.log(e);
	})
}

export const getNotifications = async (_id) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User)<-[NOTIFY]-(n:Notification) WHERE u._id = $_id RETURN n';
	return await dbSession.session.run(query, { _id }).then((res) => {
		const notifications = []
		closeBridge(dbSession)
		res.records.map(record => {
			notifications.push(record._fields[0].properties)
		})
		return (notifications)
	})
	.catch(e => {
	console.log(e);
	})
}

export const deleteNotification = async (_id) => {
	const dbSession = session(mode.WRITE);
	const query = 'MATCH (n:Notification) WHERE n._id = $_id DETACH DELETE n';
	return await dbSession.session.run(query, { _id }).then((res) => {
		closeBridge(dbSession)
	})
	.catch(e => {
	console.log(e);
	})
}