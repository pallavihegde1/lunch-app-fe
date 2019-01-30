import React, { Component } from 'react'
import { Popup, Button, Icon, List, Grid } from 'semantic-ui-react'

class TableFilter extends Component {
  render(){
    return(
      <Popup
        trigger={<span><Icon name='filter'/> Filter </span>}
        content={<FilterDiv {...this.props}/>}
        hoverable
      />
    );
  }
}

const FilterDiv = props => {
  return (
    <div>
      <List divided relaxed>
        {props.selectedFilters.map((column, index) => (
          <List.Item>
            <List.Content>
              <FilterGrid index={index} removeFilter={props.removeFilter}/>
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
    <Grid columns={4} divided>
      <Grid.Row>
        <Grid.Column>
            <Icon name='remove' onClick={() => props.removeFilter(props.index)}/>
        </Grid.Column>
        <Grid.Column>
            Where
        </Grid.Column>
        <Grid.Column>
          Contains
        </Grid.Column>
        <Grid.Column>
            Value
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
