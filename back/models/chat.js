import { mode, session, closeBridge } from '../middleware/session';

export const initChat = async (user, _id) => {
	const dbSession = session(mode.WRITE);
	const query = 'MERGE (f:User)-[c:CHAT {history:"[]"}]-(t:User) WHERE f._id = $_id AND WHERE t._id = $u_id';
	
		await dbSession.session.run(query, {_id: user._id, u_id: _id}).then(res => {
			closeBridge(dbSession);
		}).catch(e => console.log(e))
}

export const getHistory = async (user) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User)-[c:CHAT]-(m) WHERE u._id = $_id RETURN c,m';

	return await dbSession.session.run(query, user).then(res => {
		closeBridge(dbSession);
		const chats = [];
		res.records.map(record => {
			let messages = JSON.parse(record._fields[0].properties.history)
			chats.push(...messages);
		});
		return chats
	}).catch(e => console.log(e))
}

export const getMessages = async (sender, receiver) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User)-[c:CHAT]-(m:User) WHERE u._id = $_id AND m._id = $m_id RETURN c';

	return await dbSession.session.run(query, {'_id': sender, 'm_id': receiver}).then(res => {
		closeBridge(dbSession);
		if (res.records.length)
			return JSON.parse(res.records[0]._fields[0].properties.history);
		return [];
	}).catch(e => console.log(e))
}

export const addMessage = async (message) => {
	const dbSession = session(mode.WRITE);
	const query = 'MATCH (u:User)-[c:CHAT]-(m:User) WHERE u._id = $_id AND m._id = $m_id SET c += {history: $messages}';
	const history = await getMessages(message.sender, message.receiver);
	history.push(message);
	await dbSession.session.run(query, {_id: message.sender, m_id: message.receiver, messages: JSON.stringify(history)}).then(res => {
		closeBridge(dbSession);
	}).catch(e => console.log(e));
}