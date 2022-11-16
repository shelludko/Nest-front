import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategories } from '../store/categories/actions';
import { setCategoryId } from '../store/categories/reducer';
import { fetchProducts } from '../store/products/actions';
import { setActiveSort } from '../store/products/reducer';
import { PriceSort } from '../utils/price-sort';
import { ProductCard } from './ProductCard';

const Showcase = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products);
    const categories = useSelector((state) => state.categories.categories);
    const activeSort = useSelector((state) => state.products.activeSort);
    const categoryId = useSelector(
        (state) => state.categories.activeCategoryId
    );

    const handleCategoryChange = (event) =>
        dispatch(setCategoryId(event.target.attributes[0].value));

    const handleSortType = (event) =>
        dispatch(setActiveSort(Number(event.target.attributes[0].value)));

    const handleNull = () => {
        dispatch(setCategoryId(0));
        dispatch(setActiveSort(0));
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProducts(categoryId));
    }, [categoryId, dispatch]);

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
                        {categories?.map((category) => {
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
                    {PriceSort(activeSort, products)?.map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))}
                </Container>
            </Container>
        </Row>
    );
};

export default Showcase;
