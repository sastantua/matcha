import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../../context/UserContext';
import api from '../../api/api';

import { Contact, DialogBox } from '.';
import { chatSocket } from '../../api/socket';
import { useImmer } from 'use-immer';
import { SPACING } from '../../config';
import { COLORS, BREAK_POINTS } from '../../config/style';

const SContainer = styled.div`
	display: flex;
	position: relative;
	flex-direction: row;
	width: 100%;
	height: 100vh;
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}){
		height: calc(100vh5rem);
	}
	& * {
		color: ${COLORS.WHITE};
	}
`

const MobileButton = styled.div`
	@media screen and (min-width: ${BREAK_POINTS.SCREEN_XS}) {
		display: none;
	}
	z-index: 999;
	position: absolute;
	top: 35px;
	left: 35px;
`

const ContactContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${COLORS.BLACK_LIGHT};
	width: 400px;
	border-right: 1px solid lightgrey;
	@media screen and (max-width: ${BREAK_POINTS.SCREEN_XS}) {
		display: ${p => p.hidden ? 'none' : 'flex'};
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
`

const Heading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 22px;
	padding: ${SPACING.XS};
`

export default () => {	
	const [user] = useContext(UserContext);
	const [ contacts, setContacts ] = useState([]);
	const [selectedUser, selectUser] = useState(undefined);
	const [messages, setMessages] = useImmer([]);
	const [ loading, setLoading ] = useState(false);
	const [hidden, setHidden] = useState(true);

	useEffect(() => {
		user && chatSocket.emit('connected', user._id);
		const fetchContact = async () => {
			setLoading(true);
			const res = await api.get('/user/contacts');
			setContacts(res.data);
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
	}, [user, setMessages]);

	useEffect(() => {
		contacts.length && selectUser(contacts[0]);
	}, [contacts])

	useEffect(() => {
		chatSocket.on("new_message", data => 
		setMessages(draft => { 
			draft.push(data);
		}))
	}, [setMessages])

	const pushMessage = (message) => {
		setMessages(draft => { 
			draft.push(message);
		})
	}

	const selectContact = (user) => {
		selectUser(user);
		setHidden(true);
	}

	return (
		<SContainer>
			<MobileButton onClick={() => {setHidden(!hidden)}}>
				<i className="fas fa-bars"></i>
			</MobileButton>
			<ContactContainer hidden={hidden}>
				<Heading>Contacts</Heading>
				{!loading && contacts.map((contact, index) => <Contact key={index} user={contact} handleClick={selectContact} selected={selectedUser && contact._id === selectedUser._id}/>)}
			</ContactContainer>
			{selectedUser && <DialogBox loggedUser={user} user={selectedUser} messages={messages.filter(message => ( message.sender === selectedUser._id ) || ( message.sender === user._id && message.receiver === selectedUser._id ))} pushMessage={pushMessage}/>}
		</SContainer>
	)
}