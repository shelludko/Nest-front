import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Navigation } from './components/Navigation';

export const App = () => (
    <Container
        className="container"
        style={{
            backgroundColor: 'white',
            height: '100vh',
            boxShadow: '0px 0px 8px -2px rgba(34, 60, 80, 0.2)',
        }}
    >
        <Row>
            <Navigation />
        </Row>
    </Container>
);
