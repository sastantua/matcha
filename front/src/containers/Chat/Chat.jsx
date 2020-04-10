import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../../context/UserContext';
import api from '../../api/api';

import { Contact, DialogBox } from '.';
import socket from '../../api/socket';
import { useImmer } from 'use-immer';
import { SPACING } from '../../config';

const SContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100vw;
	height: 100vh;
`

const ContactContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 400px;
	border-right: 1px solid lightgrey;
`

const Heading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 22px;
	padding: ${SPACING.XS};
`

export default () => {	
	const { user } = useContext(UserContext);
	const [ contacts, setContacts ] = useState([]);
	const [selectedUser, selectUser] = useState(undefined);
	const [messages, setMessages] = useImmer([]);
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		user && socket.emit('connected', user._id);
		const fetchContact = async () => {
			setLoading(true);
			const res = await api.get('/user/contacts');
			setContacts(res.data);
			console.log(res.data);
			setLoading(false);
		}
		const fetchHistory = async () => {
			setLoading(true);
			const res = await api.get('/chat/history');
			setMessages(() => res.data);
			setLoading(false);
		}
		fetchContact();
		fetchHistory();
	}, [user]);

	useEffect(() => {
		selectUser(contacts[0]);
	}, [contacts])

	useEffect(() => {
		socket.on("new_message", data => 
		setMessages(draft => { 
			draft.push(data);
		}))
	}, [setMessages])

	const pushMessage = (message) => {
		setMessages(draft => { 
			draft.push(message);
		})
	}

	return (
		<SContainer>
			<ContactContainer>
				<Heading>Contacts</Heading>
				{!loading && contacts.map((contact, index) => <Contact key={index} user={contact} handleClick={selectUser} selected={selectedUser && contact._id === selectedUser._id}/>)}
			</ContactContainer>
			{selectedUser && <DialogBox loggedUser={user} user={selectedUser} messages={messages.filter(message => ( message.sender === selectedUser._id ) || ( message.sender === user._id && message.receiver === selectedUser._id ))} pushMessage={pushMessage}/>}
		</SContainer>
	)
}