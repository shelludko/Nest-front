import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import API_URL from '../constants/urls';
import { fetchCategories } from '../store/reducers/categoriesReducer';
import { fetchItems } from '../store/reducers/itemsReducer';
import getRequest from '../utils/get-request';
import PriceSort from '../utils/price-sort';
import ProductCard from './ProductCard';

const Showcase = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.itemsReducer.items);
    const categories = useSelector(
        (state) => state.categoriesReducer.categories
    );

    const [products, setProducts] = useState([]);
    const [categoryID, setCategoryID] = useState(0);
    const [sortType, setSortType] = useState(0);

    useEffect(() => {
        PriceSort(sortType, items);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType, items]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (categoryID === 0) {
            dispatch(fetchItems());
            return;
        } else {
            getRequest(
                `${API_URL}api/products/category/${categoryID}`,
                setProducts
            );
        }
    }, [categoryID, dispatch]);

    const handleCategoryChange = (event) => {
        setCategoryID(event.target.attributes[0].value);
        console.log(event.target.attributes[0].value);
    };

    const handleNull = () => {
        setCategoryID(0);
        setSortType(3);
    };

    const handleSortType = (event) => {
        setSortType(Number(event.target.attributes[0].value));
    };

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
                    {categoryID !== 0
                        ? products.map((item) => {
                              return <ProductCard key={item.id} item={item} />;
                          })
                        : items.map((item) => {
                              return <ProductCard key={item.id} item={item} />;
                          })}
                </Container>
            </Container>
        </Row>
    );
};

export default Showcase;
