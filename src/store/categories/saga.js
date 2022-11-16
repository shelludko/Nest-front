import { getRequest } from '../../utils/get-request';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from '../../constants';
import { FETCH_CATEGORIES } from './actionList';
import { setCategories } from './reducer';

const fetchData = () => getRequest(`${API_URL}api/categories/`);

function* getCategoriesWorker() {
    const data = yield call(fetchData);
    yield put(setCategories(data));
}

export default function* categoriesWatcher() {
    yield takeEvery(FETCH_CATEGORIES, getCategoriesWorker);
}
