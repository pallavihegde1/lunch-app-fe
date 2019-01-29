import createReducer from '../../lib/createReducer';

let actions = {};
actions.SET_COLUMNS = '/containers/table/SET_COLUMNS';
actions.SET_SEARCHED_DATA_FOUND = '/containers/table/SET_SEARCHED_DATA_FOUND';
actions.SEARCH_TEXT = '/containers/table/SEARCH_TEXT';
actions.SET_DEFAULT_SORTABLE = '/containers/table/SET_DEFAULT_SORTABLE';
actions.SET_BULK_SELECT = 'containers/table/SET_BULK_SELECT';
actions.SET_SELECTED_ROWS = 'containers/table/SET_SELECTED_ROWS';

const initialState = {
  columns: [],
  searchedDataFound: [],
  searchText: '',
  defaultSortable: '',
  bulkSelect: false,
  selectedRows: []
}

export function setColumns(payload){
  return {
    type: actions.SET_COLUMNS,
    payload: {columns: payload}
  }
}

export function setSearchedDataFound(payload){
  return {
    type: actions.SET_SEARCHED_DATA_FOUND,
    payload: {searchedDataFound: payload}
  }
}

export function setSearchText(payload){
  return {
    type: actions.SEARCH_TEXT,
    payload: {searchText: payload}
  }
}

export function setDefaultSortable(payload){
  return {
    type: actions.SET_DEFAULT_SORTABLE,
    payload: {defaultSortable: payload}
  }
}

export function setBulkSelect(payload){
  return {
    type: actions.SET_BULK_SELECT,
    payload: {bulkSelect: payload}
  }
}

export function setSelectedRows(payload){
  return {
    type: actions.SET_SELECTED_ROWS,
    payload: {selectedRows: payload}
  }
}

export const table = createReducer(initialState, {
  [actions.SET_COLUMNS](state, action) {
    return { ...state, ...action.payload };
  },
  [actions.SET_SEARCHED_DATA_FOUND](state, action) {
    return { ...state, ...action.payload };
  },
  [actions.SEARCH_TEXT](state, action) {
    return { ...state, ...action.payload };
  },
  [actions.SET_DEFAULT_SORTABLE](state, action) {
    return { ...state, ...action.payload };
  },
  [actions.SET_BULK_SELECT](state, action) {
    return { ...state, ...action.payload };
  },
  [actions.SET_SELECTED_ROWS](state, action) {
    return { ...state, ...action.payload };
  }
});
