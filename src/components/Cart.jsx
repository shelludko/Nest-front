import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL, VALUE } from '../constants';
import { getCart, deleteItem } from '../store/cart/actions';
import { setActiveId } from '../store/cart/reducer';
import { divOfNums } from '../utils/division-of-numbers';
import { Count } from './Count';

export const Cart = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    // const idProduct = useSelector((state) => state.cart.activeId);

    // const handleDeleteItem = (event) => {
    //     dispatch(setActiveId(VALUE(event)));
    // }

    // useEffect(() => {
    //     dispatch(getCart());
    // }, [dispatch]);

    // useEffect(() => {
    //     dispatch(deleteItem(idProduct));
    // }, [dispatch, idProduct]);

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
                    { cart ? cart.map((item) => {
                        return (
                            <Row
                                key={item.id}
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
                                        src={`${API_URL}${item.image}`}
                                        alt="Product photo"
                                    />
                                </Col>

                                <Col md={4}>
                                    <p>{item.name}</p>
                                </Col>

                                <Col md={2}>
                                    <Count />
                                </Col>

                                <Col
                                    style={{
                                        textAlign: 'end',
                                    }}
                                    md={3}
                                >
                                    <strong>
                                        {divOfNums(item.totalPrice)}
                                    </strong>{' '}
                                </Col>

                                <Col md={1}>
                                    <button
                                        value={item.id}
                                        // onClick={handleDeleteItem}
                                        className="delete-button"
                                    >
                                        🗑
                                    </button>
                                </Col>
                            </Row>
                        );
                    }) : ''}
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
