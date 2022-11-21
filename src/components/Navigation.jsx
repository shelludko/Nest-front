import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import Showcase from './Showcase';
import { Cart4 } from 'react-bootstrap-icons';
import { Cart } from './Cart';
import { CountRound } from './CountRound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Navigation = () => {
    const [modalShow, setModalShow] = useState(false);
    

    return (
        <Router>
            <ToastContainer  />
            <Navbar bg="success" variant="dark" className="navbar">
                <Container>
                    <Link className="navbar-brand ms-3" to="/">
                        ELECTR☢NIX
                    </Link>

                    <Nav className="me-auto">
                        <Link className="navbar-link ms-3" to="/login">
                            Войти
                        </Link>

                        <Link className="navbar-link ms-3" to="/register">
                            Регистрация
                        </Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link
                            style={{display: 'flex'}}
                            onClick={() => setModalShow(true)}
                            className="me-3"
                        >
                            <Cart4 className="cart" />
                            <CountRound />
                        </Nav.Link>
                        <Cart
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Nav>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={<Showcase />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default Navigation;
