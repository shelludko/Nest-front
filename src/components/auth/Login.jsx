import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const Login = () => {
    return (
        <Container
            className="col-8 d-flex flex-column justify-content-center align-items-center gap-3"
            style={{ height: '80vh' }}
        >
            <h2>Вход</h2>
            <Form className="mt-3 text-center">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Button variant="success" type="submit">
                    Войти
                </Button>
            </Form>
        </Container>
    );
};
