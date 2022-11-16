import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeSort: 0,
    products: [],
};

const slice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, { payload }) => ({ ...state, products: payload }),
        setActiveSort: (state, { payload }) => ({
            ...state,
            activeSort: payload,
        }),
    },
});

export const { setProducts, setActiveSort } = slice.actions;
export default slice.reducer;
