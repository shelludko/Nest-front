import { createAction } from '@reduxjs/toolkit';
import { GET_CART, ADD_ITEM, DELETE_ITEM } from './actionList';

export const getCart = createAction(GET_CART);
export const addToCart = createAction(ADD_ITEM);
export const deleteItem = createAction(DELETE_ITEM);
