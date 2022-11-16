import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { API_URL } from '../constants/urls';

export const ProductCard = ({ item }) => {
    const { id, image, name, description, price } = item;

    return (
        <Card key={id} className="text-center">
            <Card.Img
                style={{ height: '15rem' }}
                variant="top"
                src={`${API_URL}${image}`}
                alt="Product photo"
            />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text className="cut-text">{description}</Card.Text>
                <Card.Text>
                    <strong>{price}.00</strong> ₽
                </Card.Text>

                <Button className="btn-sm" variant="success">
                    В корзину
                </Button>
            </Card.Body>
        </Card>
    );
};
