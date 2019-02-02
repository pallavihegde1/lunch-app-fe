import _ from 'lodash';

export const queryCondition = (attrValue, searchValue, query) => {
  switch (query) {
    case 'Contains': return attrValue && attrValue.includes(searchValue);
    case 'Does Not Contain': return attrValue && !attrValue.includes(searchValue);
    case 'Is': return attrValue && attrValue === searchValue;
    case 'IsNot': return attrValue && attrValue !== searchValue;
    case 'Is Empty': return _.isEmpty(attrValue);
    case 'Is Not Empty': return !_.isEmpty(attrValue);
    default: return;
  }
}

export const filterFunction = (data, attr, searchValue, query) => {
  const val = data.filter(d => queryCondition(d[attr], searchValue, query))
  return val
}

export const loopFilters = (data, filters) => {
  if(filters.length === 1) {
     return filterFunction(data, filters[0].attribute, filters[0].value, filters[0].query)
  }
  else {
    if(filters[1].predicate === 'And') {
      let filteredData = data
      filters.forEach((filter, index) => {
         filteredData = filterFunction(filteredData, filter.attribute, filter.value, filter.query)
      })
      return filteredData;
    }
    else if(filters[1].predicate === 'Or') {
      let filteredData = []
      filters.forEach((filter, index) => {
        const indexedFilter = filterFunction(data, filter.attribute, filter.value, filter.query)
         filteredData = [...filteredData, ...indexedFilter];
      })
      return filteredData;
    }
  }
}
