import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import API_URL from '../constants/api-url';
import Dropdown from 'react-bootstrap/Dropdown';
import { CartCheckFill } from 'react-bootstrap-icons';

const Showcase = () => {
    const [items, setItems] = useState([]);
    const [itemsFilter, setItemsFilter] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}api/products/`).then((response) => {
            setItems(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            axios
                .get(`${API_URL}api/products/category/${selectedCategory}`)
                .then((response) => {
                    setItemsFilter(response.data);
                });
        }
        }
            , [selectedCategory]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.attributes[0].value);
    };

    useEffect(() => {
        axios.get(`${API_URL}api/categories/`).then((response) => {
            setCategories(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getFilteredList = () => {
        if (!selectedCategory) {
            return items;
        }
        return itemsFilter;
    };

    const itemsByCategory = useMemo(getFilteredList, [
        selectedCategory,
        itemsFilter,
        items,
    ]);

    return (
        <Row>
            <div className="col-12 mt-3 d-flex justify-content-end gap-3">
                <Dropdown>
                    <Dropdown.Toggle
                        variant="outline-success"
                        id="dropdown-basic"
                    >
                        Фильтр
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>Цена возростает</Dropdown.Item>
                        <Dropdown.Item>Цена убывает</Dropdown.Item>
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
                        <Dropdown.Item key={1} onClick={handleCategoryChange}>
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

            <div className="col-12 mt-3">
                <div className="d-flex justify-content-start align-items-center gap-3 ">
                    {itemsByCategory.map((item) => {
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
                                        <CartCheckFill className="cart" /> Купить
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
