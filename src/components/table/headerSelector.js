import React from 'react';
import { Button, Popup, List, Icon, Checkbox } from 'semantic-ui-react'
 import PropTypes from 'prop-types';

const ColumnList = (props) => {
  return(
    <>
      {props.columns.map((column) => (
        <List>
          <List.Item>
            <Checkbox checked={!column.value} toggle onChange={(e, {checked}) => props.toggleColumns(column.header, {checked})}/>
            <List.Content>{column.header}</List.Content>
          </List.Item>
        </List>
      ))}
    </>
  )
}

const HeaderSelector = (props) => {
  return(
      <div style={{textAlign: 'left'}}>
        <Popup
          trigger={<Button icon> <Icon name='eye' /> {props.hiddenColumnCount} hidden feilds </Button>}
          content={<ColumnList columns={props.columns} toggleColumns={props.toggleColumns}/>}
          hoverable
        />
      </div>
  );
}

HeaderSelector.propTypes = {
  hiddenColumnCount: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  toggleColumns: PropTypes.func.isRequired

}

HeaderSelector.defaultProps = {
  columns: [],
}

export default HeaderSelector;
