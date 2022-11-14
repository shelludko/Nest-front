import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import API_URL from '../constants/urls';
import {
    FETCH_ITEMS,
    setItems,
} from '../store/reducers/itemsReducer';

const fetchData = () =>
    axios.get(`${API_URL}api/products/`).then((response) => response.data);

function* getItemsWorker() {
    const data = yield call(fetchData);
    yield put(setItems(data));
}

export function* itemsWatcher() {
    yield takeEvery(FETCH_ITEMS, getItemsWorker);
}
