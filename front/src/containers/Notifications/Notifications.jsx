import React, { useContext } from 'react';
import styled from 'styled-components';

import { NotificationsContext } from '../../context/NotificationsProvider.js';
import { COLORS, SPACING } from '../../config/style.js';
import { notifSocket } from '../../api/socket.js';

const Notifications = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Button = styled.button`
	color: ${COLORS.WHITE};
	background-color: ${COLORS.PINK_FLASHY};
	padding: 14px 20px;
	margin: 8px 0;
	margin-top: 2vh;
	border: none;
	border-radius: 4px;
	width: auto;
	cursor: pointer;
	:hover {
		transform: scale(1.05);
	}
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: ${SPACING.BASE};
`

const Notification = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 250px;
	height: 25px;
	background-color: ${COLORS.ORANGE_GRADIENT};
	color: ${COLORS.WHITE};
	margin: ${SPACING.XS} 0;
	padding: ${SPACING.XXS} ${SPACING.XS};
	border-radius: 16px;
	& > p {
		margin: 0;
	}
`

export default () => {
	const [notifications, addNotification] = useContext(NotificationsContext);

	const handleDelete = (_id) => {
		notifSocket.emit('read', _id);
		addNotification(draft => {
			draft.splice(draft.findIndex((current) => current._id === _id), 1);
		})
	}

	const handleClear = () => {
		for (let tmp of notifications) {
			notifSocket.emit('read', tmp._id);	
		}
		addNotification(() => []);
	}

	const notificationText = (notification) => {		
		switch (notification.type) {
			case "like" :
				return 'Someone liked you';
			case "unlike" :
				return 'Someone unliked you';
			case "block" :
				return 'Someone blocked you';
			case "visit" :
				return 'Someone visited your profile';
			case "match" :
				return 'Someone you liked likes you';
			case "message" :
				return "You've got a new message";
			default :
				break;
		}
	}

	return (
		<Notifications>
				<Button onClick={handleClear} >Delete All</Button>
			<Container>
				{
					notifications.map((notification, index) => 
						<Notification key={index}>
							<p>{notificationText(notification)}</p>
							<p onClick={() => handleDelete(notification._id)} ><i className="fas fa-trash-alt" ></i></p>
						</Notification>	
					)
				}
			</Container>
		</Notifications>
	)
}