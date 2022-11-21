import categories from './categories/reducer';
import products from './products/reducer';
import cart from './cart/reducer';

export const rootReducer = {
    products,
    categories,
    cart,
};
