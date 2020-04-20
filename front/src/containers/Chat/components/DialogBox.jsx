import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';
import { animateScroll } from "react-scroll";

import { chatSocket } from '../../../api/socket';
import Message, { LoaderMessage } from './Message';
import { SPACING } from '../../../config';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
`

const Header = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 22px;
	padding: ${SPACING.XS};
`
const ContentWrapper = styled.div`
	flex: 1;
	height: 100%;
	overflow-y: scroll;
	&::-webkit-scrollbar {
  		width: 0.25rem;
  		height: 0.25rem;
	}
	&::-webkit-scrollbar-track {
	  background: #1e1e24;
	}
	&::-webkit-scrollbar-thumb {
  		background: #FFE2FF;
	}

`

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-start;
	padding: ${SPACING.BASE};
`

const TextInput = styled.div`
	display: flex;
	align-items: center;
	padding: ${SPACING.XS};
`

const SInput = styled.input`
	display: flex;
	flex: 1;
	border: none;
	height: 30px;
	font-size: 1em;
	padding: ${SPACING.XXS} ${SPACING.XS};
	background-color: rgba(0, 0, 0, .05);
	border-radius: 18px;
	margin-right: ${SPACING.BASE};
	&:focus {
		outline: none;
	}
`

export default ({ loggedUser, user, messages, pushMessage }) => {
	const [message, setMessage] = useState('');
	const [typing, isTyping] = useState(false);

	const scrollToBottom = () => {
		animateScroll.scrollToBottom({
		  containerId: "chat",
		  smooth: false,
		  duration: 2
		});
	}

	useEffect(() => {
		scrollToBottom();
	})

	useEffect(() => {
		chatSocket.on('typing', data => {
			isTyping(true);
			console.log("typing")
			setTimeout(() => {
				isTyping(false);
				console.log('no more typing');
			}, 6000);
		});
	}, [isTyping])

	const handleChange = (e) => {
		chatSocket.emit('typing', {
			sender: loggedUser._id,
			receiver: user._id
		});
		setMessage(e.target.value)
	}

	const sendMessage = () => {
		if (message === '')
			return;
		const data = {
			sender: loggedUser._id,
			receiver: user._id,
			message: message
		}
		chatSocket.emit('send_message', data);
		pushMessage(data);
		setMessage('');
		scrollToBottom();
	}

	return (
		<Wrapper>
			<Header>
				<p>{user.firstname}</p>
			</Header>
			<ContentWrapper id="chat">
				<Content>
					{messages.map((message, index) => <Message key={index} content={message} self={message.sender === loggedUser._id}/>) }
					{typing && <LoaderMessage />}
				</Content>
			</ContentWrapper>
			<TextInput>
				<SInput type="text" placeholder="Write a message..." onChange={handleChange} value={message} onKeyDown={(e) => e.keyCode === 13 && sendMessage()}/>
				<SendIcon style={{color: message === '' ? 'lightgrey' : '#0084ff'}} onClick={sendMessage} />
			</TextInput>
		</Wrapper>
	)
}