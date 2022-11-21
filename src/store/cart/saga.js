
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from '../../constants';
import {
    deleteRequest, getRequest,
    postRequest
} from '../../utils/get-request';
import { ADD_ITEM, DELETE_ITEM, GET_CART } from './actionList';
import { addToCart, getCart, removeFromCart } from './reducer';

const fetchDataGet = () => getRequest(`${API_URL}api/cart/`);

// const fetchDataPost = (payload) =>
//     postRequest(`${API_URL}api/cart/add-item`, payload);


// const fetchDataDelete = (id) =>
//     deleteRequest(`${API_URL}api/cart/${id}`);

function* getCartWorker() {
    const data = yield call(fetchDataGet);
    yield put(addToCart(data));
}

// function* addToCartWorker(payload) {
//     const data = yield call(fetchDataPost);
//     yield put(addToCart(data, payload));
// }

// function* removeFromCartWorker() {
//     const data = yield call(fetchDataDelete);
//     yield put(removeFromCart(data));
// }

export default function* cartWatcher() {
    yield takeEvery(GET_CART, getCartWorker);
    // yield takeEvery(ADD_ITEM, addToCartWorker);
    // yield takeEvery(DELETE_ITEM, removeFromCartWorker);
}
