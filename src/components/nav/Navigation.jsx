import { useState } from 'react';
import { Bag } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from '../auth/Login';
import { Register } from '../auth/Register';
import { Cart } from '../cart/Cart';
import { CartModal } from '../cart/CartModal';
import { CountRound } from './CountRound';
import { Showcase } from '../products/Showcase';

export const Navigation = () => {
    const [modalShow, setModalShow] = useState(false);
    const screenWidth = document.documentElement.clientWidth;

    return (
        <Router>
            <ToastContainer />
            <nav
                className="navbar navbar-expand-lg navbar-dark bg-success"
                style={{ borderRadius: '0' }}
            >
                <Container className="container-fluid">
                    <Link className="navbar-brand ms-3" to="/">
                        ELECTR☢NIX
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo03"
                        aria-controls="navbarTogglerDemo03"
                        aria-expanded="false"
                        aria-label="Переключатель навигации"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarTogglerDemo03"
                    >
                        <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Link className="navbar-link ms-3" to="/login">
                                Войти
                            </Link>

                            <Link className="navbar-link ms-3" to="/register">
                                Регистрация
                            </Link>
                        </Nav>
                        <Nav className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {screenWidth > 775 ? (
                                <Link
                                    style={{
                                        display: 'flex',
                                        textDecoration: 'none',
                                    }}
                                    onClick={() => setModalShow(true)}
                                    className="cart-button me-3"
                                >
                                    <h3>
                                        <Bag className="cart" />
                                    </h3>
                                    <CountRound />
                                </Link>
                            ) : (
                                <Link
                                    style={{
                                        display: 'flex',
                                        textDecoration: 'none',
                                    }}
                                    to="/cart"
                                    className="cart-button me-3"
                                >
                                    <h3>
                                        <Bag className="cart" />
                                    </h3>
                                    <CountRound />
                                </Link>
                            )}

                            <CartModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </Nav>
                    </div>
                </Container>
            </nav>
            <Routes>
                <Route path="/" element={<Showcase />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    );
};
