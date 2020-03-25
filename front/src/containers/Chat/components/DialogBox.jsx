import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`

export default ({ user }) => {
	return (
		<Wrapper>
			<p>Salut</p>
		</Wrapper>
	)
}