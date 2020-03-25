import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../../context/UserContext';
import api from '../../api/api';

import { connect } from './socketFactory';

import { Contact, DialogBox } from '.';

const SContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: 100vh;
`

const ContactContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 30%;
`

export default () => {	
	const { user } = useContext(UserContext);
	const [ contacts, setContacts ] = useState([]); 
	const [selectedUser, selectUser] = useState({});
	const [ loading, setLoading ] = useState(true);

	useEffect( () => {
		user && connect(user._id);
		const fetchContact = async () => {
			const res = await api.get('/user/contacts');
			setContacts(res.data);
			setLoading(false);
		}
		fetchContact();
	}, [])

	return (
		<SContainer>
			<ContactContainer>
				{!loading && contacts.map((contact, index) => <Contact key={index} user={contact} onClick={(e) => selectUser(contact)}/>)}
			</ContactContainer>
			<DialogBox user={selectedUser}/>
		</SContainer>
	)
}