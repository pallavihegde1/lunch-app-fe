export const filterPredicates = ['Where', 'And', 'Or']

export const predicateOptions = filterPredicates.map(p => {
  return {value: p, label: p}
})
