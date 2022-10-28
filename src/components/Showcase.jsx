import { useEffect, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import API_URL from '../constants/api-url';
import getRequest from '../utils/get-request';
import PriceSort from '../utils/price-sort';

const Showcase = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryID, setCategoryID] = useState(0);
    const [sortType, setSortType] = useState(0);

    useEffect(() => {
        PriceSort(sortType, items, setItems);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType]);

    useEffect(() => {
        getRequest(`${API_URL}api/categories/`, setCategories);
    }, []);

    useEffect(() => {
        if (categoryID === 0) {
            getRequest(`${API_URL}api/products/`, setItems);
            return;
        } else {
            getRequest(
                `${API_URL}api/products/category/${categoryID}`,
                setItems
            );
        }
    }, [categoryID]);

    const handleCategoryChange = (event) => {
        setCategoryID(event.target.attributes[0].value);
    };

    const handleNull = () => {
        setCategoryID(0);
        setSortType(3);
    };

    const handleSortType = (event) => {
        setSortType(Number(event.target.attributes[0].value));
    };

    const itemFiltred = useMemo(() => {
        return items;
    }, [items]);

    return (
        <Row>
            <Container className="col-12 mt-3 d-flex justify-content-end gap-3">
                <Dropdown>
                    <Dropdown.Toggle
                        variant="outline-success"
                        id="dropdown-basic"
                    >
                        Цена
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item value={1} onClick={handleSortType}>
                            Дешевле
                        </Dropdown.Item>
                        <Dropdown.Item value={2} onClick={handleSortType}>
                            Дороже
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown className="me-4">
                    <Dropdown.Toggle
                        variant="outline-success"
                        id="dropdown-basic"
                    >
                        Выбрать категорию
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleNull}>Все</Dropdown.Item>
                        {categories.map((category) => {
                            return (
                                <Dropdown.Item
                                    key={category.id}
                                    value={category.id}
                                    onClick={handleCategoryChange}
                                >
                                    {category.name}
                                </Dropdown.Item>
                            );
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </Container>

            <Container className="col-12 mt-3">
                <Container className="d-flex justify-content-start align-items-center gap-3 ">
                    {itemFiltred.map((item) => {
                        return (
                            <Card key={item.id} className="text-center">
                                <Card.Img
                                    style={{ height: '15rem' }}
                                    variant="top"
                                    src={`${API_URL}${item.image}`}
                                    alt="Product photo"
                                />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text className="cut-text">
                                        {item.description}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>{item.price}.00</strong> ₽
                                    </Card.Text>

                                    <Button
                                        className="btn-sm"
                                        variant="success"
                                    >
                                        В корзину
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Container>
            </Container>
        </Row>
    );
};

export default Showcase;
