import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from '../../constants';
import { getRequest } from '../../utils/request';
import { FETCH_PRODUCTS } from './actionList';
import { setProducts } from './reducer';

const fetchData = (path) => getRequest(`${API_URL}api/products${path}`);

function* getProductsWorker({ payload }) {
    const path = payload === 0 ? '' : `/category/${payload}`;
    const data = yield call(fetchData, path);
    yield put(setProducts(data));
}

export default function* productsWatcher() {
    yield takeEvery(FETCH_PRODUCTS, getProductsWorker);
}
