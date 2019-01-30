import React, { Component } from 'react'
import { Popup, Button, Icon, List, Grid, Input } from 'semantic-ui-react'
import Select from 'react-select';
import { predicateOptions, filterQueriesOptions } from '../constants';

class TableFilter extends Component {
  render(){
    return(
      <Popup
        trigger={<span><Icon name='filter'/> Filter </span>}
        content={<FilterDiv {...this.props}/>}
        on='click'
        position='bottom right'
      />
    );
  }
}

const FilterDiv = props => {
  return (
    <div style={{width: '60em'}}>
      <List divided relaxed>
        {props.selectedFilters.map((column, index) => (
          <List.Item>
            <List.Content>
              <FilterGrid index={index} column = {column} removeFilter={props.removeFilter} updateSelectedfilters={props.updateSelectedfilters} filterableColumns={props.filterableColumns}/>
            </List.Content>
          </List.Item>
        ))}
      </List>
    <Button onClick={props.addFilter}><Icon name='add'/> Add Filter </Button>
    {/* <p><Button> Apply Filters </Button></p> */}
    </div>
  )
}

const FilterGrid = props => {
  return (
    <Grid columns={5} divided>
      <Grid.Row>
        <Grid.Column>
            <Icon name='remove' onClick={() => props.removeFilter(props.index)}/>
        </Grid.Column>
        <Grid.Column>
          <Select
            isSearchable={false}
            options={props.index === 0 ? [{value: 'Where', label: 'Where'}] : predicateOptions}
            value={{value: props.column.predicate, label: props.column.predicate}}
            onChange={(value) => props.updateSelectedfilters('predicate',value.value, props.index)}
          />
        </Grid.Column>
        <Grid.Column>
          <Select
            options={props.filterableColumns}
            value={{value: props.column.attribute, label: props.column.attribute}}
            onChange={(value) => props.updateSelectedfilters('attribute',value.value, props.index)}
          />
        </Grid.Column>
        <Grid.Column>
          <Select
            options={filterQueriesOptions}
            value={{value: props.column.query, label: props.column.query}}
            onChange={(value) => props.updateSelectedfilters('query',value.value, props.index)}
          />
        </Grid.Column>
        <Grid.Column>
            <Input placeholder='Search...' onBlur={(e) => props.updateSelectedfilters('value',e.target.value, props.index)}/>
        </Grid.Column>
      </Grid.Row>
  </Grid>
  )
}

FilterDiv.defaultProps = {
  filterableColumns: [],
  selectedFilters: []
}
export default TableFilter;
