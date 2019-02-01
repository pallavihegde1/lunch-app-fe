import _ from 'lodash';

export const queryCondition = (attrValue, searchValue, query) => {
  switch (query) {
    case 'Contains': return attrValue.includes(searchValue);
    case 'Does Not Contain': return !attrValue.includes(searchValue);
    case 'Is': return attrValue === searchValue;
    case 'IsNot': return attrValue !== searchValue;
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
  let filteredData = data
  if(filters.length === 1) {
     return filterFunction(data, filters[0].attribute, filters[0].value, filters[0].query)
  }
  else {
    if(filters[1].predicate === 'And') {
      filters.forEach((filter, index) => {
         filteredData = filterFunction(filteredData, filter.attribute, filter.value, filter.query)
         return filteredData;
      })
    }
    else if(filters[1].predicate === 'Or') {
      const orFilteredData = []
      filters.forEach((filter, index) => {
         filteredData = _.merge(orFilteredData, filterFunction(data, filter.attribute, filter.value, filter.query));
         return filteredData;
      })
    }
  }
  return filteredData
}
