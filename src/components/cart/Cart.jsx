import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../constants';
import { Trash } from 'react-bootstrap-icons';
import { PlusSquare } from 'react-bootstrap-icons';
import { DashSquare } from 'react-bootstrap-icons';
import {
    decreaseCartItem,
    removeFromCart,
    increaseCartItem,
    clearCart,
    getTotals,
} from '../../store/cart/reducer';
import { divOfNums } from '../../utils/division-of-numbers';

export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getTotals());
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
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                gap: '50px',
                marginTop: '50px',
            }}
        >
            <Row>
                <Col>
                    <header>
                        <h2>Корзина</h2>
                    </header>
                </Col>
            </Row>
            <Row
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Col
                    xs={12}
                    sm={12}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {cart.cartItems.length ? (
                        cart.cartItems?.map((cartItem) => {
                            return (
                                <Row
                                    key={cartItem.id}
                                    style={{
                                        paddingTop: '10px',
                                        borderTop: '1px dotted lightgray',
                                        borderBottom: '1px dotted lightgray',
                                        marginBottom: '10px',
                                        padding: '20px',
                                    }}
                                >
                                    <Col xs={12} sm={12}>
                                        <Image
                                            style={{
                                                height: '4rem',
                                                marginBottom: '10px',
                                            }}
                                            variant="top"
                                            src={`${API_URL}${cartItem.image}`}
                                            alt="Product photo"
                                        />
                                    </Col>

                                    <Col xs={12} sm={12}>
                                        <p>{cartItem.name}</p>
                                    </Col>

                                    <Col
                                        xs={12}
                                        sm={12}
                                        style={{ marginBottom: '10px' }}
                                    >
                                        <div className="count">
                                            <button
                                                onClick={() =>
                                                    handleDecreaseCartItem(
                                                        cartItem
                                                    )
                                                }
                                                className="count-button"
                                            >
                                                <DashSquare />
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
                                                <PlusSquare />
                                            </button>
                                        </div>
                                    </Col>

                                    <Col
                                        xs={12}
                                        sm={12}
                                        style={{ marginBottom: '15px' }}
                                    >
                                        <strong>
                                            {divOfNums(
                                                cartItem.price *
                                                    cartItem.itemQuantity
                                            )}
                                        </strong>{' '}
                                    </Col>

                                    <Col xs={12} sm={12}>
                                        <button
                                            value={cartItem.id}
                                            onClick={() =>
                                                handleDeleteItem(cartItem)
                                            }
                                            className="delete-button"
                                        >
                                            <Trash />
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
                        <Row
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Col
                                md={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '20px',
                                        // marginRight: '90px',
                                        marginTop: '20px',
                                        // marginBottom: '20px',
                                    }}
                                >
                                    <span>Итого:</span>
                                    <strong>
                                        {divOfNums(cart.cartTotalAmount)}
                                    </strong>
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        false
                    )}
                </Col>
            </Row>
            <Row>
                <Col
                    xs={12}
                    sm={12}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column-reverse',
                        alignItems: 'center',
                        gap: '20px',
                        marginBottom: '20px'
                    }}
                >
                    <Link to="/">
                        <Button variant="outline-success">
                            Продолжить покупки
                        </Button>
                    </Link>
                    <Button variant="outline-dark" onClick={handleCartClear}>
                        Очистить корзину
                    </Button>
                    <Link to="">
                        <Button variant="success">Перейти к оформлению</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};
