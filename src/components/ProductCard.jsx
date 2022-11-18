import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { API_URL } from '../constants';
import { divOfNums } from '../utils/division-of-numbers';
import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../store/cart/actions';
import { addToCart } from '../store/cart/reducer';

export const ProductCard = ({ item }) => {
    const { id, image, name, description, price } = item;

    const dispatch = useDispatch();
    const activeId = useSelector((state) => state.cart.activeId);
    const products = useSelector((state) => state.products.products);

    const handleAddItem = (item) => {
        dispatch(addToCart(item));
    };

    return (
        <Card key={id} className="text-center">
            <Card.Body>
                <Card.Img
                    style={{ height: '10rem' }}
                    variant="top"
                    src={`${API_URL}${image}`}
                    alt="Product photo"
                />
            </Card.Body>

            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text className="cut-text">{description}</Card.Text>
                <Card.Text style={{ marginTop: '10px' }}>
                    <strong>{divOfNums(price)}</strong>
                </Card.Text>

                <Button
                    value={id}
                    onClick={() => handleAddItem(item)}
                    className="btn-sm"
                    variant="success"
                >
                    В корзину
                </Button>
            </Card.Body>
        </Card>
    );
};
