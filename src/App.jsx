import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navigation from './components/Navigation';

class App extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Navigation />
                </Row>
            </Container>
        );
    }
}

export default App;
