import io from 'socket.io';
import { createServer } from 'http';
import { getChats, initChat } from '../models/chat';

const app = require('../app');

const socketServer = createServer(app);
socketServer.listen(4242);

const socket = io(socketServer);

const users = [];

socket.on('connection', socket => {
	socket.on('connected', id => users[id] = socket.id);
})

export default socket;