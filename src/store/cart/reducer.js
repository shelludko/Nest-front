import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const slice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].itemQuantity++;
                toast.info(
                    `Количество ${state.cartItems[itemIndex].name} увеличилось на единицу`,
                    { position: 'bottom-left' }
                );
            } else {
                const tempProduct = { ...action.payload, itemQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} добавлен в корзину`, {
                    position: 'bottom-left',
                });
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem.id !== action.payload.id
            );

            state.cartItems = nextCartItems;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

            toast.error(`${action.payload.name} удалён из корзины`, {
                position: 'bottom-left',
            });
        },

        increaseCartItem(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );

            if (state.cartItems[itemIndex].itemQuantity >= 0) {
                state.cartItems[itemIndex].itemQuantity++;

                toast.info(
                    `Количество ${state.cartItems[itemIndex].name} увеличилось на единицу`,
                    { position: 'bottom-left' }
                );
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        decreaseCartItem(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );

            if (state.cartItems[itemIndex].itemQuantity > 1) {
                state.cartItems[itemIndex].itemQuantity--;

                toast.info(
                    `Количество ${state.cartItems[itemIndex].name} уменьшилось на единицу`,
                    { position: 'bottom-left' }
                );
            } else if (state.cartItems[itemIndex].itemQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (cartItem) => cartItem.id !== action.payload.id
                );

                state.cartItems = nextCartItems;

                toast.error(`${action.payload.name} удалён из корзины`, {
                    position: 'bottom-left',
                });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        clearCart(state) {
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

            toast.info('Корзина очищена', {
                position: 'bottom-left',
            });
        },

        getTotals(state, action) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, itemQuantity } = cartItem;
                    const itemTotal = price * itemQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += itemQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );

            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseCartItem,
    decreaseCartItem,
    clearCart,
    getTotals,
} = slice.actions;
export default slice.reducer;
