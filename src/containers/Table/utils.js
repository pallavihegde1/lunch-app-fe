import _ from 'lodash';

export const queryCondition = (attrValue, searchValue, query) => {
  switch (query) {
    case 'Contains': return attrValue.includes(searchValue);
    case 'Does Not Contain': return attrValue.includes(searchValue);
    case 'Is': return attrValue === searchValue;
    case 'IsNot': return attrValue !== searchValue;
    case 'Is Empty': return _.isEmpty(attrValue);
    case 'Is Not Empty': return !_.isEmpty(attrValue);
    default: return;
  }
}

export const andFunction = (data, attr, searchValue, query) => {
  const val = data.filter(d => queryCondition(d[attr], searchValue, query))
  debugger
  return val
}

export const loopFilters = (data, filters) => {
  let filteredData = data
  filters.forEach(filter => {
    debugger
    filteredData = andFunction(filteredData, filter.attribute, filter.value, filter.query)
  })
  return filteredData;
}
