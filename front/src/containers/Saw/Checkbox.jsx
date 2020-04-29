import React from "react";
import styled from "styled-components";

import { Checkbox } from "@material-ui/core";
import { COLORS, BREAK_POINTS } from '../../config/style'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const CheckboxContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const Text = styled.span`
	color: ${COLORS.WHITE};
	width: 50%;
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

function OrderCheckbox(props) {
	
	const handleLike = (e) => {!props.liked && !props.visited ? props.setLiked(true) : props.setLiked(false);}
	const handleVisited = (e) => {!props.visited && !props.liked ? props.setVisited(true) : props.setVisited(false);}

	return (
		<MainContainer>
			<CheckboxContainer>
				<Text>liked</Text>
				<Checkbox checked={props.liked} onChange={handleLike} value="test" style={{color: "#FFF", marginLeft: "auto"}}/>
			</CheckboxContainer>
			<CheckboxContainer>
				<Text>visited</Text>
				<Checkbox checked={props.visited} onChange={handleVisited} value="test" style={{color: "#FFF", marginLeft: "auto"}}/>
			</CheckboxContainer>
		</MainContainer>
	);
}

export default OrderCheckbox;