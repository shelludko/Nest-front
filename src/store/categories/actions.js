import { createAction } from '@reduxjs/toolkit';
import { FETCH_CATEGORIES } from './actionList';

export const fetchCategories = createAction(FETCH_CATEGORIES);
