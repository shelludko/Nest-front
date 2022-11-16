import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeCategoryId: 0,
    categories: [],
};

const slice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => ({
            ...state,
            categories: action.payload,
        }),
        setCategoryId: (state, { payload }) => ({
            ...state,
            activeCategoryId: payload,
        }),
    },
});

export const { setCategories, setCategoryId } = slice.actions;
export default slice.reducer;
