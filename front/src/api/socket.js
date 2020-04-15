import socketClient from "socket.io-client";

export const chatSocket =  socketClient("http://localhost:4242/chat");

export const notifSocket =  socketClient("http://localhost:4242/notifications");
