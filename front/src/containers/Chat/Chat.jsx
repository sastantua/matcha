import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../../context/UserContext';
import api from '../../api/api';

import { Contact, DialogBox } from '.';
import socket from '../../api/socket';

const SContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: 100vh;
`

const ContactContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 30%;
`

export default () => {	
	const { user } = useContext(UserContext);
	const [ contacts, setContacts ] = useState([]);
	const [ messages, addMessage ] = useState({});
	const [selectedUser, selectUser] = useState(undefined);
	const [ loading, setLoading ] = useState(true);

	socket.on("new_message", (data) => {
		let tmp = messages;
		console.log(data);
		let key = data.sender;
		tmp.key = tmp.key.push(data);
		addMessage(tmp);
	})

	useEffect(() => {
		user && socket.emit('connected', user._id);
		const fetchContact = async () => {
			const res = await api.get('/user/contacts');
			setContacts(res.data);
			setLoading(false);
		}
		fetchContact();
	}, [user])

	useEffect(() => {
		let tmp = messages;
		contacts.map(contact => {
			let key = contact._id;
			tmp.key = [];
		})
		addMessage(tmp);
	}, [contacts])

	return (
		<SContainer>
			<ContactContainer>
				{!loading && contacts.map((contact, index) => <Contact key={index} user={contact} handleClick={selectUser} />)}
			</ContactContainer>
			{selectedUser && <DialogBox loggedUser={user} user={selectedUser} messages={messages[selectedUser._id]} />}
		</SContainer>
	)
}