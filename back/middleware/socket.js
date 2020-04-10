import io from 'socket.io';
import { createServer } from 'http';
import { addMessage } from '../models/chat';

const app = require('../app');

const socketServer = createServer(app);
socketServer.listen(4242);

const socket = io(socketServer);

const users = [];

socket.on('connection', socket => {
	socket.on('connected', id => {
		users[id] = socket.id
	});

	socket.on('send_message', async data => {
		await addMessage(data);
		socket.to(users[data.receiver]).emit("new_message", data);
	})

	socket.on('typing', data => {
		socket.to(users[data.receiver]).emit("typing", data);
	})
})

export default socket;