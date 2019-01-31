export const queryCondition = (attrValue, searchValue, query) => {
  switch (query) {
    case 'Contains': return attrValue.includes(searchValue);
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
    filteredData = andFunction(data, filter.attribute, filter.value, filter.query)
  })
  return filteredData;
}
