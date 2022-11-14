import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
} from 'redux';
import itemsReducer from './reducers/itemsReducer';
import categoriesReducer from './reducers/categoriesReducer';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    itemsReducer,
    categoriesReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);

export default store;
