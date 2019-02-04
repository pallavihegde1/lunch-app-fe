// creates react select options, by mapping value
export const createOption = option => {
  return {
    value: option,
    label: option,
  };
};

// creates react select options, by taking propertys
export const createPropertyOption = (
  valueProperty,
  labelProperty
) => option => {
  return {
    value: option[valueProperty || 'id'],
    label: option[labelProperty || 'name'],
  };
};
