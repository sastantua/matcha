import React from 'react';
import {Section, Container, Heading} from 'react-bulma-components';

class Homepage extends React.Component {
    render () {
        return (
            <div>
                <Section>
                    <Container breakpoint="widescreen">
                        <Heading>
                            Matcha
                        </Heading>
                    </Container>
                </Section>
            </div>
        )
    }
}

export default Homepage;