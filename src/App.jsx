import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { Navigation } from './components/nav/Navigation';

export const App = () => (
    <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
    >
        <Container
            className="container"
            style={{
                backgroundColor: 'white',
                height: '100%',
                boxShadow: '0px 0px 8px -2px rgba(34, 60, 80, 0.2)',
            }}
        >
            <Row>
                <Navigation />
            </Row>
        </Container>
    </ThemeProvider>
);
