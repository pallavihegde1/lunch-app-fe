import React from 'react';
import {Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const BulkActionList = (props) => {
  return (
    <>
      <Dropdown text= {`Bulk Action (${props.selectedRows.length} selected)`}>
      <Dropdown.Menu>
        {props.bulkActions.map((action, index) => (
          <Dropdown.Item key={index} text={action.action}  onClick={() => action.function(props.selectedRows)}/>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    </>
  )
}

BulkActionList.propTypes = {
  bulkActions: PropTypes.array.isRequired,
  selectedRows: PropTypes.array.isRequired
};

BulkActionList.defaultProps = {
  bulkActions: [],
  selectedRows: [],
}


export default BulkActionList;
