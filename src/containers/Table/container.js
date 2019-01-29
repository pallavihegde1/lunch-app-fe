import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Icon, Label, Menu, Table, Checkbox } from 'semantic-ui-react'
import TableActions from '../../components/table/tableActions';
import HeaderSelector from '../../components/table/headerSelector';
import TablePagination from '../../components/table/tablePagination';
import Search from '../../components/table/tableSearch';
import BulkActionList from '../../components/table/bulkActionDropdown';
import { findPageRange, findStartPage, findCurrentData } from '../../components/table/utils';
import { SetRowsPerPage, SetPages, SetCurrentPage } from './paginationReducer';
import { setColumns, setSearchedDataFound, setSearchText, setDefaultSortable, setBulkSelect, setSelectedRows} from './tableReducer';
import { connect } from 'react-redux';
import _ from 'lodash';

class TableComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      columns: props.records.map(m => {
        const obj = m
         obj['value'] = true
         return obj
       }),
      searchedDataFound: this.sortedData(props.data),
      searchText: '',
      defaultSortable: props.defaultSortable,
      bulkSelect: false,
      selectedRows: []
    };
  }

  componentWillMount(){
    const numberOfPages = Math.ceil(
     this.props.data.length / this.props.tablePagination.rowsPerPage.value
    )
    const columns =  this.props.records.map(m => {
      const obj = m
       obj['value'] = true
       return obj
     })
     const searchedDataFound = this.sortedData(this.props.data)
     const defaultSortable = this.props.defaultSortable
    this.props.dispatch(SetPages(numberOfPages))
    this.props.dispatch(setColumns(columns))
    this.props.dispatch(setSearchedDataFound(searchedDataFound))
    this.props.dispatch(setDefaultSortable(defaultSortable))
  }

   componentDidUpdate(prevProps) {
    if(prevProps.data !== this.props.data) {
      const numberOfPages = Math.ceil(
       prevProps.data.length / this.props.tablePagination.rowsPerPage.value
      )
      this.props.dispatch(SetPages(numberOfPages))
    }
    // this.setState({
    //   searchedDataFound: this.sortedData(this.props.data),
    // });
  }

  sortedData = (data) => {
    const defaultSortable = (this.state || {}).defaultSortable
    return _.sortBy(data, defaultSortable);
  }

  toggleColumns = (column, {checked}) => {
    let columns = this.state.columns
    let updatedColumn = this.state.columns.find(c => c.header === column) || {}
    updatedColumn.value = !checked
    this.setState({ columns })
  }

  setTableCurrentPage = currentPage => {
    this.setState({ currentPage });
  };

  onSelectRowsPerPage = rowsPerPage => {
    const selectedRowsPerPage = rowsPerPage
      ? rowsPerPage
      : { value: 10, label: '10 Items' };
    let currentPage = this.props.tablePagination.currentPage;
    const numberOfPages = Math.ceil(
      this.state.searchedDataFound.length / selectedRowsPerPage.value
    );
    if (numberOfPages < currentPage) currentPage = numberOfPages;
    this.props.dispatch(SetCurrentPage(currentPage))
    this.props.dispatch(SetRowsPerPage(selectedRowsPerPage))
    this.props.dispatch(SetPages(numberOfPages))
  };

  setSearchedData = (
  searchedDataFound,
  numberOfPages,
  searchText,
  currentPage = this.props.tablePagination.currentPage
  ) => {
    searchedDataFound = this.sortedData(searchedDataFound)
    this.setState({
      searchedDataFound,
      searchText,
    });
    this.props.dispatch(SetCurrentPage(currentPage))
    this.props.dispatch(SetPages(numberOfPages))
  };

  updateDefaultSortable = async(column) => {
    await this.setState({defaultSortable: column.column})
    const searchedDataFound = this.sortedData(this.state.searchedDataFound)
    this.setState({searchedDataFound})
  }

  enableBulkSelect = ({checked}) => {
    const selectedRows = checked ? this.state.searchedDataFound.map(i => i._id) : []
    this.setState({bulkSelect: checked, selectedRows})
  }

  updateSelectedRows = ({checked}, row_id) => {
    let selectedRows = this.state.selectedRows
    const rowIndex = selectedRows.indexOf(row_id);
    if (rowIndex > -1 && !checked) selectedRows.splice(rowIndex, 1);
    if (rowIndex === -1) selectedRows.push(row_id);
    this.setState({selectedRows});
  }

  render(){
    const props = this.props
    const visibleColumns = this.state.columns.filter(d => d.value)
    const hiddenColumnCount = this.state.columns.filter(d => !d.value).length
    const {tablePagination} = this.props
    const startPage = findStartPage(
      tablePagination.numberOfPages,
      tablePagination.currentPage
    );
    const pageRange = findPageRange(tablePagination.numberOfPages, startPage);
    //slice current data set
    const currentData = findCurrentData(
      this.state.searchedDataFound,
      tablePagination.currentPage,
      tablePagination.rowsPerPage
    );
    const hasBulkActions = props.bulkActions.length
    return(
      <div>
        <div>
          <HeaderSelector hiddenColumnCount = {hiddenColumnCount} columns={this.state.columns.filter(c => !props.mandatoryFeilds.includes(c.column))} toggleColumns={this.toggleColumns}/>
          <Search searchText={this.state.searchText} fullData={this.props.data}
                  searchKeys={this.props.searchKeys}
                  rowsPerPage={tablePagination.rowsPerPage}
                  setSearchedData={this.setSearchedData}
                />

        {hasBulkActions && this.state.selectedRows.length ? <BulkActionList bulkActions={this.props.bulkActions} selectedRows={this.state.selectedRows}/> : null}
        </div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{hasBulkActions ? <Checkbox checked={this.state.bulkSelect} onChange={(e, {checked}) => this.enableBulkSelect({checked})}/> : null } Sl.no</Table.HeaderCell>
              {visibleColumns.map((column) => (
                <Table.HeaderCell onClick={() => this.updateDefaultSortable(column)}>{column.column === this.state.defaultSortable ? <Icon name='arrow down'/> : null } {column.header}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {currentData.map((data, index) => (
              <Table.Row>
                <Table.Cell>
                  <Label ribbon>
                    {(tablePagination.currentPage - 1) * tablePagination.rowsPerPage.value + index + 1}
                  </Label>
                  {hasBulkActions ? <Checkbox checked={this.state.selectedRows.includes(data._id)} onChange={(e, {checked}) => this.updateSelectedRows({checked}, data._id)}/> :  null}
                </Table.Cell>
                {visibleColumns.map(c => c.column).map((cell) => (
                  cell !== 'action' ?
                  <Table.Cell> {props.complexRecords.includes(cell) ? props.findComplexRecords(cell, data[cell])  : data[cell]} </Table.Cell> : <Table.Cell> <TableActions actions={['Edit', 'Delete']}/> </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
          <TablePagination
            pageRange={pageRange}
            currentPage={tablePagination.currentPage}
            numberOfPages={tablePagination.numberOfPages}
            numberOfColumns="3"
            name={this.props.name || 'table'}
            rowCount={this.props.data.length}
            rowsPerPage={tablePagination.rowsPerPage}
            onSelectRowsPerPage={this.onSelectRowsPerPage}
            setTableCurrentPage={this.setTableCurrentPage}
            />
        </Table>
      </div>
    );
  }
}

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  includeAction: PropTypes.bool.isRequired
}

TableComponent.defaultProps = {
  complexRecords: [],
  bulkActions: []
}

const mapStateToProps = ({tablePagination}) => ({tablePagination})

export default connect(
    mapStateToProps,
  )(TableComponent);
