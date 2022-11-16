import { all } from 'redux-saga/effects';
import categories from './categories/saga';
import products from './products/saga';

export function* rootSaga() {
    yield all([products(), categories()]);
}
