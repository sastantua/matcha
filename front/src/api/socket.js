import socketClient from "socket.io-client";

export const chatSocket =  socketClient(`${process.env.REACT_APP_SOCKET_URL}/chat`);

export const notifSocket =  socketClient(`${process.env.REACT_APP_SOCKET_URL}/notifications`);
