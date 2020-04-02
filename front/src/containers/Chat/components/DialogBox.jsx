import React, { useState } from 'react';
import styled from 'styled-components';
import socket from '../../../api/socket';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: stretch;
	align-items: stretch;
	width: 100%;
	height: 100%;
`

const Header = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const Content = styled.div`
	flex: 1;
`

const TextInput = styled.div`
	display: flex;
`

export default ({ loggedUser, user, messages }) => {
	const [message, setMessage] = useState(undefined);

	const sendMessage = () => {
		socket.emit('send_message', {
			sender: loggedUser._id,
			receiver: user._id,
			message: message
		});
	}
	return (
		<Wrapper>
			<Header>
				<p>{user.firstname}</p>
			</Header>
			<Content>
				{messages && messages.map(message => <div><p>{message.sender} :</p><p>{message.message}</p></div>) }
			</Content>
			<TextInput>
				<input type="text" onChange={(e) => setMessage(e.target.value)}/>
				<button onClick={sendMessage}>Submit</button>
			</TextInput>
		</Wrapper>
	)
}