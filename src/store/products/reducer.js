import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeSortPrice: 0,
    products: [],
};

const slice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, { payload }) => ({ ...state, products: payload }),
        setactiveSortPrice: (state, { payload }) => ({
            ...state,
            activeSortPrice: payload,
        }),
    },
});

export const { getProducts, setProducts, setactiveSortPrice } = slice.actions;
export default slice.reducer;
