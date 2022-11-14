import { all } from 'redux-saga/effects';
import { itemsWatcher } from './itemsSaga';
import { categoriesWatcher } from './categoriesSaga';

export function* rootWatcher() {
    yield all([itemsWatcher(), categoriesWatcher()]);
}
