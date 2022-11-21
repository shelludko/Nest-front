import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../constants';
import {
    decreaseCartItem,
    removeFromCart,
    increaseCartItem,
    clearCart,
    getTotals
} from '../store/cart/reducer';
import { divOfNums } from '../utils/division-of-numbers';

export const Cart = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getTotals())
    }, [cart, dispatch]);

    const handleDeleteItem = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    };

    const handleDecreaseCartItem = (cartItem) => {
        dispatch(decreaseCartItem(cartItem));
    };
    
    const handleIncreaseCartItem = (cartItem) => {
        dispatch(increaseCartItem(cartItem));
    };

    const handleCartClear = () => {
        dispatch(clearCart());
    };

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#25A266',
                    color: 'white',
                }}
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    Корзина
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    {cart.cartItems.length ? (
                        cart.cartItems?.map((cartItem) => {
                            return (
                                <Row
                                    key={cartItem.id}
                                    style={{
                                        paddingTop: '10px',
                                        borderBottom: '1px dotted lightgray',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <Col md={2}>
                                        <Image
                                            style={{ height: '2rem' }}
                                            variant="top"
                                            src={`${API_URL}${cartItem.image}`}
                                            alt="Product photo"
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <p>{cartItem.name}</p>
                                    </Col>

                                    <Col md={2}>
                                        <div className="count">
                                            <button
                                                onClick={() =>
                                                    handleDecreaseCartItem(
                                                        cartItem
                                                    )
                                                }
                                                className="count-button"
                                            >
                                                -
                                            </button>
                                            <span className="count_input">
                                                {cartItem.itemQuantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleIncreaseCartItem(
                                                        cartItem
                                                    )
                                                }
                                                className="count-button"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </Col>

                                    <Col
                                        style={{
                                            textAlign: 'end',
                                        }}
                                        md={3}
                                    >
                                        <strong>
                                            {divOfNums(
                                                cartItem.price *
                                                    cartItem.itemQuantity
                                            )}
                                        </strong>{' '}
                                    </Col>

                                    <Col md={1}>
                                        <button
                                            value={cartItem.id}
                                            onClick={() =>
                                                handleDeleteItem(cartItem)
                                            }
                                            className="delete-button"
                                        >
                                            🗑
                                        </button>
                                    </Col>
                                </Row>
                            );
                        })
                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '15px' }}>
                            <p>Корзина пустая. Начните добавлять товары.</p>
                        </div>
                    )}
                    {cart.cartItems.length ? (
                        <Row>
                            <Col
                                md={11}
                                style={{
                                    textAlign: 'end',
                                    marginBottom: '10px',
                                }}
                            >
                                <span style={{ marginRight: '80px' }}>
                                    Общая стоимость:
                                </span>
                                <strong>
                                    {divOfNums(cart.cartTotalAmount)}
                                </strong>
                            </Col>

                            <Button
                                variant="outline-danger"
                                onClick={handleCartClear}
                            >
                                Очистить корзину
                            </Button>
                        </Row>
                    ) : (
                        false
                    )}
                </Container>
            </Modal.Body>
            <Modal.Footer
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#25A266',
                }}
            >
                <Button variant="success" onClick={props.onHide}>
                    Продолжить покупки
                </Button>
                <Button variant="outline-light">Перейти к оформлению</Button>
            </Modal.Footer>
        </Modal>
    );
};
