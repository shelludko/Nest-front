import { createAction } from '@reduxjs/toolkit';
import { FETCH_PRODUCTS } from './actionList';

export const fetchProducts = createAction(FETCH_PRODUCTS);
