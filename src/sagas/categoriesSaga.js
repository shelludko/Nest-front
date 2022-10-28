import { put, takeEvery, call } from 'redux-saga/effects';
import API_URL from '../constants/urls';
import { FETCH_CATEGORIES, setCategories } from '../store/reducers/categoriesReducer';

const url = () => fetch(`${API_URL}api/products`);

function* getCategoriesWorker() {
    const data = yield call(url());
    const json = yield call(() => new Promise((res) => res(data.json())));
    yield put(setCategories(json));
}

export function* categoriesWatcher() {
    yield takeEvery(FETCH_CATEGORIES, getCategoriesWorker);
}
