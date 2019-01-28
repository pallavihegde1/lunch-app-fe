import React, {Component} from 'react';
import TableContainer from '../Table/container';
import { fetchMenuItems, deleteMenuItems } from './reducer';
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

class MenuItemList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchMenuItems())
  }

  findComplexRecords(attr, value){
    switch (attr) {
      case 'availablity':
        return (value || []).join(',');
      default: return;

    }
  }

  onDelete = (ids) => {
    this.props.dispatch(deleteMenuItems(ids))
  }

  render(){
    const {menuItems} = this.props
    return(
      <div>
        MenuItem list
        {/* <Button>New Item</Button> */}
        <TableContainer data={menuItems} records={[{header: 'Name', column: 'name', sortable: true},{header: 'Description', column: 'desc', sortable: true}, {header: 'Category', column: 'category'}, {header: 'Availablity', column: 'availablity'},{header: 'Expertised', column: 'isExpertised'}, {header: 'Feasible', column: 'isFeasible'}, {header: 'Actions', column: 'action'}]} includeAction complexRecords={['availablity']} mandatoryFeilds={['name']} searchKeys={{name: true, desc: true}} findComplexRecords={this.findComplexRecords} name="Menuitems" defaultSortable='name' bulkActions={[{action: 'delete', function: this.onDelete}]}
        />
      </div>
    );
  }
}

const mapStateToProps = ({menuItems}) => ({menuItems})

export default connect(
    mapStateToProps,
  )(MenuItemList);
