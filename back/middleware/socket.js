import io from 'socket.io';
import { createServer } from 'http';
import { addMessage } from '../models/chat';

const app = require('../app');

const socketServer = createServer(app);
socketServer.listen(4242);

const socket = io(socketServer);

const chatUsers = [];
const users = []

const chat = socket.of('/chat');
const notifications = socket.of('/notifications');

chat.on('connection', socket => {
	chat.on('connected', id => {
		chatUsers[id] = socket.id;
	});

	chat.on('send_message', async data => {
		await addMessage(data);
		chat.to(chatUsers[data.receiver]).emit("new_message", data);
	})

	chat.on('typing', data => {
		chat.to(chatUsers[data.receiver]).emit("typing", data);
	})
})

notifications.on('connection', socket => {
	notifications.on('connected', id => {
		users[id] = socket.id;
	})

	notification.on('notification', data => {
		notification.to(users[data.to]).emit('notification', data);
	})
})

export default socket;