import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from '../../constants';
import { FETCH_PRODUCTS } from './actionList';
import { setProducts } from './reducer';

const fetchData = (path) =>
    axios
        .get(`${API_URL}api/products${path}`)
        .then((response) => response.data);

function* getProductsWorker({ payload }) {
    const path = payload === 0 ? '' : `/category/${payload}`;
    const data = yield call(fetchData, path);
    yield put(setProducts(data));
}

export default function* productsWatcher() {
    yield takeEvery(FETCH_PRODUCTS, getProductsWorker);
}
