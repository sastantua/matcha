import io from 'socket.io';
import { createServer } from 'http';
import { addMessage } from '../models/chat';
import { saveNotification, getNotifications } from '../models/notification';

const app = require('../app');

const socketServer = createServer(app);
socketServer.listen(4242);

const sockets = io(socketServer);

const chatUsers = [];
const users = []

export const chat = sockets.of('/chat').on('connection', socket => {
	socket.on('connected', id => {
		chatUsers[id] = socket.id;
	});

	socket.on('send_message', data => {
		addMessage(data);
		socket.to(chatUsers[data.receiver]).emit("new_message", data);
	})

	socket.on('typing', data => {
		socket.to(chatUsers[data.receiver]).emit("typing", data);
	})
})

export const notifications = sockets.of('/notifications').on('connection', socket => {
	socket.on('connected', async id => {
		users[id] = socket.id;
		const notifications = await getNotifications(id);
		socket.to(users[id]).emit('notifications', notifications);
	})

	socket.on('notification', data => {
		socket.to(users[data.to]).emit('notification', data);
		saveNotification(data);
		
	})

	socket.on('read', _id => {
		deleteNotification(_id);
	})
})