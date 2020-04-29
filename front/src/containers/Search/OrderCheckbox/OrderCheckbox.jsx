import React from "react";
import styled from "styled-components";

import { Checkbox } from "@material-ui/core";
import { TextWrapper } from "../../../components/Wrapper/Wrapper.jsx";

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const CheckboxContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

function OrderCheckbox(props) {
	
	const handleAscending = (e) => {!props.ascending && !props.descending ? props.setAscending(true) : props.setAscending(false);}
	const handleDescending = (e) => {!props.descending && !props.ascending ? props.setDescending(true) : props.setDescending(false);}

	return (
		<MainContainer>
			<CheckboxContainer>
				<TextWrapper>ascending</TextWrapper>
				<Checkbox checked={props.ascending} onChange={handleAscending} value="test" style={{color: "#FFF", marginLeft: "auto"}}/>
			</CheckboxContainer>
			<CheckboxContainer>
				<TextWrapper>descending</TextWrapper>
				<Checkbox checked={props.descending} onChange={handleDescending} value="test" style={{color: "#FFF", marginLeft: "auto"}}/>
			</CheckboxContainer>
		</MainContainer>
	);
}

export default OrderCheckbox;