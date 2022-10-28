const initialState = {
    categories: [],
};
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export default function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CATEGORIES:
            return { ...state, categories: action.payload };
        default:
            return state;
    }
}

export const setCategories = (payload) => ({ type: SET_CATEGORIES, payload });
export const fetchCategories = () => ({ type: FETCH_CATEGORIES });
