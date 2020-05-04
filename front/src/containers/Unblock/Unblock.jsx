import React, {useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import styled from 'styled-components'

import api from '../../api/api'
import Loader from '../../components/Loader/Loader'
import { COLORS, SPACING, BREAK_POINTS } from '../../config/style';

const UnblockContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	& > * {
		margin-top: 3vh;
	}
`

const RowContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	width: 50%;
	& > :last-child {
		margin-left: ${SPACING.XS};
	}
`

const Cell = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50%;
`

const Text = styled.span`
	color: ${COLORS.WHITE};
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 600;
		font-size: 1.3em;
		width: auto;
	}
	@media only screen and (max-width: ${BREAK_POINTS.SCREEN_SM}) {
		font-weight: 400;
		font-size: 0.8em;
	}
`

const StyledButton = styled.button`
	color: ${COLORS.WHITE};
	background-color: ${COLORS.PINK_FLASHY};
	padding: 5px 10px;
	margin: 8px 0;
	margin-top: 2vh;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	:hover {
		transform: scale(1.05);
	}
`

function Unblock() {
	const [users, setUsers] = useImmer([]);
	const [fetchState, setFetchState] = useState(false);

	useEffect(() => {
		api.get('/user/blocked')
		.then((res) => {
			setUsers(() => res.data);
			setFetchState(true);
		})
		.catch((err) => {
			console.log(err);
		})
	}, []);

	const handleUnblock = (id) => {
		api.post(`user/unblock/${id}`)
		.then(() => {
			setUsers((draft) => {
				draft.splice(draft.findIndex((current) => current._id === id), 1);
			})
		})
		.catch((err) => {console.log(err)})
	}

	const Users = () => {
		return (
			users.map((user, index) => {
				return (
					<RowContainer key={user._id}>
						<Cell>
							<Text>{user.username}</Text>
						</Cell>
						<Cell>
							<StyledButton onClick={() => handleUnblock(user._id)}>Unblock</StyledButton>
						</Cell>
					</RowContainer>
				);
			}
		));
	}

	return (
		fetchState ?
			<UnblockContainer id="UnblockContainer">
				<Users/>
			</UnblockContainer>
		: <Loader/>
	);
}

export default Unblock;