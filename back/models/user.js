import uuidv1 from 'uuid/v1';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mode, session, closeBridge } from '../middleware/session'

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
	const query = 'CREATE (u:User { _id: $_id, username: $username, email: $email, password: $password })';
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
		let {_id, username, email, password} = res.records[0]._fields[0].properties;
		const user = {_id, username, email, password};
		return user;
	}).catch (e => {
		console.log(e);
	})
}

export const findByCreditentials = async (email, password) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User) WHERE u.email = $email RETURN u';
	const user = await dbSession.session.run(query, {email, password}).then(res => {
		closeBridge(dbSession);
		let {_id, username, email, password} = res.records[0]._fields[0].properties;
		const user = {_id, username, email, password};
		return user;
	}).catch (e => {
		console.log(e);
	})
	if (!user || !await bcrypt.compare(password, user.password))
		throw new Error('Invalid Creditentials');
	else
		return user;
}

export const generateAuthToken = async (user) => {
	const dbSession = session(mode.WRITE);
	const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
	const query = 'MATCH (u:User) WHERE u._id = $_id CREATE (t:Token {token: $token}) CREATE (t)-[:AUTH]->(u)';
	
	await dbSession.session.run(query, {_id: user._id, token: token}).then(res => closeBridge(dbSession))
	.catch (e => console.log(e));
	
	return token
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