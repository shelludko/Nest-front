import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from '../../constants/urls';
import { FETCH_CATEGORIES } from './actionList';
import { setCategories } from './reducer';

const fetchData = () =>
    axios.get(`${API_URL}api/categories/`).then((response) => response.data);

function* getCategoriesWorker() {
    const data = yield call(fetchData);
    yield put(setCategories(data));
}

export default function* categoriesWatcher() {
    yield takeEvery(FETCH_CATEGORIES, getCategoriesWorker);
}
