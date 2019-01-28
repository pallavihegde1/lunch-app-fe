import createReducer from '../../lib/createReducer';

let actions = {};
actions.SET_ROWS_PER_PAGE = '/containers/table/SET_ROWS_PER_PAGE'
actions.SET_CURRENT_PAGE = '/containers/table/SET_CURRENT_PAGE';
actions.SET_NUMBER_OF_PAGES = '/containers/table/SET_NUMBER_OF_PAGES';
actions.SET_PAGINATION_DATA = '/containers/table/SET_PAGINATION_DATA';

const initialState = {
  numberOfPages: null,
  currentPage: 1,
}

export function setPaginationData(payload){
  return {
    type: actions.SET_PAGINATION_DATA,
    payload: {...payload}
  }
}

export function SetRowsPerPage(payload){
  return {
    type: actions.SET_ROWS_PER_PAGE,
    payload: {rowsPerPage: payload}
  }
}

export function SetCurrentPage(payload){
  return {
    type: actions.SET_CURRENT_PAGE,
    payload
  }
}

export function SetPages(payload){
  return {
    type: actions.SET_NUMBER_OF_PAGES,
    payload: {numberOfPages: payload}
  }
}

export const tablePagination = createReducer(initialState, {
  [actions.SET_PAGINATION_DATA](state, action) {
    return { ...state, ...action.payload };
  },
  [actions.SET_CURRENT_PAGE](state, action) {
    return { ...state, ...action.payload };
  },
  [actions.SET_ROWS_PER_PAGE](state, action) {
    return { ...state, ...action.payload };
  },
  [actions.SET_NUMBER_OF_PAGES](state, action) {
    return { ...state, ...action.payload };
  }
});
