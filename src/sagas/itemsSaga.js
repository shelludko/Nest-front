import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import API_URL from '../constants/urls';
import {FETCH_ITEMS, setItems } from '../store/reducers/itemsReducer';

const url = () => axios.get(`${API_URL}api/products/`).then(response => (response.data));

function* getItemsWorker() {
    const data = yield call(url());
    // const json = yield call(() => new Promise((res) => res(data.json())));
    yield put(setItems(data));
}

export function* itemsWatcher() {
  yield takeEvery(FETCH_ITEMS, getItemsWorker);
}
