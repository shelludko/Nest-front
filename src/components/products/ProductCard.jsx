import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../constants';
import { addToCart } from '../../store/cart/reducer';
import { divOfNums } from '../../utils/division-of-numbers';

export const ProductCard = ({ item }) => {
    const { id, image, name, description, price } = item;

    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        dispatch(addToCart(item));
    };

    return (
        <Card key={id} className="text-center">
            <Card.Body>
                <Card.Img
                    style={{ height: '12rem' }}
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
