import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import API_URL from '../constants/api-url';
import Dropdown from 'react-bootstrap/Dropdown';

const Showcase = () => {
    const client = axios.create({
        baseURL: `${API_URL}api/products/`,
    });

    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

    const handleCategoryChange = (event) => {
        setSelectedCategory(Number(event.target.attributes[0].value));
    };

    const getFilteredList = () => {
        if (!selectedCategory) {
            return items;
        }
        return items.filter((item) => item.categoryId === selectedCategory);
    };

    const filteredList = useMemo(getFilteredList, [selectedCategory, items]);

    useEffect(() => {
        client.get().then((response) => {
            setItems(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const client2 = axios.create({
        baseURL: `${API_URL}api/categories/`,
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        client2.get().then((response) => {
            setCategories(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Row>
            <div className='col-12 mt-5'>
                <Dropdown className="">
                    <Dropdown.Toggle
                        variant="outline-success"
                        id="dropdown-basic"
                    >
                        Выбрать категорию
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item
                            key={0}
                            value={0}
                            onClick={handleCategoryChange}
                        >
                            Все
                        </Dropdown.Item>
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
            </div>
            <div className="col-12 mt-5">
                <div className="d-flex justify-content-start align-items-center gap-3 ">
                    {filteredList.map((item) => {
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
                                    <Card.Text>{item.description}</Card.Text>
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
                </div>
            </div>
        </Row>
    );
};

export default Showcase;
