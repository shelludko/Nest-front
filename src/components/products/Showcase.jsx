import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { VALUE } from '../../constants';
import { fetchCategories } from '../../store/categories/actions';
import { setCategoryId } from '../../store/categories/reducer';
import { fetchProducts } from '../../store/products/actions';
import { setActiveSort } from '../../store/products/reducer';
import { Sort } from '../../utils/sort';
import { ProductCard } from './ProductCard';

export const Showcase = () => {
    const dispatch = useDispatch();

    const screenWidth = document.documentElement.clientWidth;

    const products = useSelector((state) => state.products.products);
    const categories = useSelector((state) => state.categories.categories);
    const activeSort = useSelector((state) => state.products.activeSort);
    const categoryId = useSelector(
        (state) => state.categories.activeCategoryId
    );

    const handleCategoryChange = (event) =>
        dispatch(setCategoryId(VALUE(event)));

    const handleSortType = (event) =>
        dispatch(setActiveSort(Number(VALUE(event))));

    const handleNullSort = () => {
        dispatch(setActiveSort(0));
    };

    const handleNullCategory = () => {
        dispatch(setCategoryId(0));
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProducts(categoryId));
    }, [categoryId, dispatch]);

    return (
        <Container>
            {screenWidth < 1400 ? (
                <Row>
                    <Col
                        xs={12}
                        md={12}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            marginTop: '20px',
                        }}
                    >
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="outline-success"
                                id="dropdown-basic"
                            >
                                Сортировка
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleNullSort}>
                                    Без сортировки
                                </Dropdown.Item>
                                <Dropdown.Item
                                    value={1}
                                    onClick={handleSortType}
                                >
                                    Цена ⇡
                                </Dropdown.Item>
                                <Dropdown.Item
                                    value={2}
                                    onClick={handleSortType}
                                >
                                    Цена ⇣
                                </Dropdown.Item>
                                <Dropdown.Item
                                    value={3}
                                    onClick={handleSortType}
                                >
                                    А-Я ⇢
                                </Dropdown.Item>
                                <Dropdown.Item
                                    value={4}
                                    onClick={handleSortType}
                                >
                                    А-Я ⇠
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown className="">
                            <Dropdown.Toggle
                                variant="outline-success"
                                id="dropdown-basic"
                            >
                                Категории
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleNullCategory}>
                                    Все
                                </Dropdown.Item>

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
                    </Col>

                    <Col
                        xs={12}
                        md={12}
                        className="mt-3"
                        style={{
                            height: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '20px',
                        }}
                    >
                        {Sort(activeSort, products)?.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col className="col-12 mt-3 d-flex justify-content-end gap-3">
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="outline-success"
                                id="dropdown-basic"
                            >
                                Сортировка
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleNullSort}>
                                    Без сортировки
                                </Dropdown.Item>
                                <Dropdown.Item
                                    value={1}
                                    onClick={handleSortType}
                                >
                                    Цена ⇡
                                </Dropdown.Item>
                                <Dropdown.Item
                                    value={2}
                                    onClick={handleSortType}
                                >
                                    Цена ⇣
                                </Dropdown.Item>
                                <Dropdown.Item
                                    value={3}
                                    onClick={handleSortType}
                                >
                                    А-Я ⇢
                                </Dropdown.Item>
                                <Dropdown.Item
                                    value={4}
                                    onClick={handleSortType}
                                >
                                    А-Я ⇠
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown className="me-4">
                            <Dropdown.Toggle
                                variant="outline-success"
                                id="dropdown-basic"
                            >
                                Категории
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleNullCategory}>
                                    Все
                                </Dropdown.Item>

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
                    </Col>

                    <Col
                        xs={12}
                        sm={6}
                        md={6}
                        lg={12}
                        style={{
                            height: '100vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'start',
                            gap: '20px',
                            marginTop: '20px',
                        }}
                    >
                        {Sort(activeSort, products)?.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </Col>
                </Row>
            )}
        </Container>
    );
};
