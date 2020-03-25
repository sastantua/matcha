import socket from '../../api/socket';

export const connect = (id) => {
	socket.emit('connected', id);
}

export const send = (data) => {
	socket.emit('send_message', data);
}