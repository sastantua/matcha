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
		console.log(`user connected`, id);
		users[id] = socket.id
	});

	socket.on('send_message', async data => {
		console.log(data.message);
		await addMessage(data);
		socket.to(users[data.receiver]).emit("new_message", data);
	})
})

export default socket;