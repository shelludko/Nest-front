import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

const devConfig = {
    devTools: true,
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    ...devConfig,
    reducer: rootReducer,
    middleware: (getDefault) =>
        getDefault({ thunk: false }).prepend(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
