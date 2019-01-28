import { combineReducers } from 'redux';
import { categories } from '../containers/categories/reducer';
import { menuItems } from '../containers/menuItems/reducer';
import { tablePagination } from '../containers/Table/reducer';

export default combineReducers(
  Object.assign(
    {categories},
    {menuItems},
    {tablePagination}
  )
);
