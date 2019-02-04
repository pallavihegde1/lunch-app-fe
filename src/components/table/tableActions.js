import React from 'react';
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types';

const findColor = (action) => {
  switch (action) {
    case 'Edit': return 'yellow';
    case 'Delete': return 'red';
    default: return ''
  }
}

const TableActions = (props) =>  {
  return (
    <div>
      {props.actions.map((action, index) => (
        <Button key={index} color={findColor(action.action)} onClick={() => action.function([props.ids])}> {action.action} </Button>
      ))}
    </div>
  )
}

TableActions.propTypes = {
  actions: PropTypes.array.isRequired,
  ids: PropTypes.string.isRequired,

}

TableActions.defaultProps = {
  actions: [],
  ids: ''
}


export default TableActions;
