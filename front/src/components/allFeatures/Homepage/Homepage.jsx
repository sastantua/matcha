import React from 'react';
import {Section, Container, Heading} from 'react-bulma-components';
import Clock from '../../Clock/Clock';


class Homepage extends React.Component {
    render () {
        return (
            <div>
                <Section>
                    <Container breakpoint="widescreen">
                        <Clock />
                    </Container>
                </Section>
            </div>
        )
    }
}

export default Homepage;