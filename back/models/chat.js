import { mode, session, closeBridge } from '../middleware/session';
import { isLiked, likes } from './user';

export const initChat = async (from, to) => {
	const dbSession = session(mode.WRITE);
	if (!await isLiked({_id: from}, to) && !await likes({_id: from}, to))
		return false;
		const query = 'MERGE (f:User)-[c:CHAT messages:"[]"]-(t:User) WHERE f._id = $from AND WHERE t._id = $to';
	
		await dbSession.session.run(query, { from, to}).then(res => {
			closeBridge(dbSession);
		}).catch(e => console.log(e))
}

export const getChats = async (id) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User)-[c:CHAT]-(m) WHERE u._id = $id RETURN c,m';

	return await dbSession.session.run(query, { id }).then(res => {
		closeBridge(dbSession);
		const chats = {};
		res.records.map(record => {
			chats[record._fields[1].properties._id] = record._fields[0].properties.messages;
		});
		console.log(chats);
		return chats
	}).catch(e => console.log(e))
}