const filterPredicates = ['And', 'Or']

const filterQueries = ['Contains', 'Does Not Contain', 'Is', 'IsNot', 'Is Empty', 'Is Not Empty']

export const predicateOptions = filterPredicates.map(p => {
  return {value: p, label: p}
})

export const filterQueriesOptions = filterQueries.map(p => {
  return {value: p, label: p}
})
