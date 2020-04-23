import socketClient from "socket.io-client";

export const chatSocket =  socketClient("http://matchapi.guillaumerx.fr:4242/chat");

export const notifSocket =  socketClient("http://matchapi.guillaumerx.fr:4242/notifications");
