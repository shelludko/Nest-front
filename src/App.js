import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
class App extends Component {
    render() {
        return (
            <Container>
                <Navigation />
            </Container>
        );
    }
}

export default App;
