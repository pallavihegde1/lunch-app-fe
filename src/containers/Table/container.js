import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Icon, Label, Menu, Table, Checkbox, Grid } from 'semantic-ui-react'
import TableActions from '../../components/table/tableActions';
import HeaderSelector from '../../components/table/headerSelector';
import TablePagination from '../../components/table/tablePagination';
import Search from '../../components/table/tableSearch';
import TableFilter from './tableFilter';
import BulkActionList from '../../components/table/bulkActionDropdown';
import { findPageRange, findStartPage, findCurrentData } from '../../components/table/utils';
import { SetRowsPerPage, SetPages, SetCurrentPage } from './paginationReducer';
import { setColumns, setSearchedDataFound, setFilteredDataFound, setSearchText, setDefaultSortable, setBulkSelect, setSelectedRows, addFilterRow, removeFilterRow, updateFilterRow, applyFilterData} from './tableReducer';
import { connect } from 'react-redux';
import _ from 'lodash';

class TableComponent extends Component {

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
    this.props.dispatch(setFilteredDataFound(searchedDataFound))
    this.props.dispatch(setDefaultSortable(defaultSortable))
  }

   componentDidUpdate(prevProps) {
    if(prevProps.data !== this.props.data) {
      const numberOfPages = Math.ceil(
       prevProps.data.length / this.props.tablePagination.rowsPerPage.value
      )
      const searchedDataFound = this.sortedData(this.props.data)
      this.props.dispatch(SetPages(numberOfPages))
      this.props.dispatch(setSearchedDataFound(searchedDataFound))
      this.props.dispatch(setFilteredDataFound(searchedDataFound))
    }
  }

  sortedData = (data) => {
    const {defaultSortable = ''} = this.props.table
    return _.sortBy(data, defaultSortable);
  }

  toggleColumns = (column, {checked}) => {
    let columns = this.props.table.columns
    let updatedColumn = columns.find(c => c.header === column) || {}
    updatedColumn.value = !checked
    this.props.dispatch(setColumns(columns))
  }

  setTableCurrentPage = currentPage => {
    this.props.dispatch(SetCurrentPage(currentPage))
  };

  onSelectRowsPerPage = rowsPerPage => {
    const selectedRowsPerPage = rowsPerPage
      ? rowsPerPage
      : { value: 10, label: '10 Items' };
    let currentPage = this.props.tablePagination.currentPage;
    const numberOfPages = Math.ceil(
      this.props.table.filteredDataFound.length / selectedRowsPerPage.value
    );
    if (numberOfPages < currentPage) currentPage = numberOfPages;
    this.props.dispatch(SetCurrentPage(currentPage))
    this.props.dispatch(SetRowsPerPage(selectedRowsPerPage))
    this.props.dispatch(SetPages(numberOfPages))
  };

  setSearchedData = (
  filteredDataFound,
  numberOfPages,
  searchText,
  currentPage = this.props.tablePagination.currentPage
  ) => {
    filteredDataFound = this.sortedData(filteredDataFound)
    this.props.dispatch(SetCurrentPage(currentPage))
    this.props.dispatch(SetPages(numberOfPages))
    this.props.dispatch(setFilteredDataFound(filteredDataFound))
    this.props.dispatch(setSearchText(searchText))
  };

  updateDefaultSortable = async(column) => {
    await this.props.dispatch(setDefaultSortable(column.column))
    const filteredDataFound = this.sortedData(this.props.table.filteredDataFound)
    this.props.dispatch(setFilteredDataFound(filteredDataFound))
  }

  enableBulkSelect = ({checked}) => {
    const selectedRows = checked ? this.props.table.filteredDataFound.map(i => i._id) : []
    this.props.dispatch(setBulkSelect(checked))
    this.props.dispatch(setSelectedRows(selectedRows))
  }

  updateSelectedRows = ({checked}, row_id) => {
    let selectedRows = this.props.table.selectedRows
    const rowIndex = selectedRows.indexOf(row_id);
    if (rowIndex > -1 && !checked) selectedRows.splice(rowIndex, 1);
    if (rowIndex === -1) selectedRows.push(row_id);
    this.props.dispatch(setSelectedRows(selectedRows))
  }

  addFilter = () => {
    const firstFilterableAttribute = this.props.records.find(r => r.filterable && r.type)
    this.props.dispatch(addFilterRow(firstFilterableAttribute || null))
  }

  removeFilter = (index) => {
    this.props.dispatch(removeFilterRow(index))
  }

  applyFilter = () => {
    this.props.dispatch(applyFilterData())
  }

  updateSelectedfilters = (attribute,value, index) => {
    this.props.dispatch(updateFilterRow(attribute, value, index))
  }

  render(){
    const props = this.props
    const {table} = this.props
    const visibleColumns = table.columns.filter(d => d.value)
    const hiddenColumnCount = table.columns.filter(d => !d.value).length
    const {tablePagination} = this.props
    const startPage = findStartPage(
      tablePagination.numberOfPages,
      tablePagination.currentPage
    );
    const pageRange = findPageRange(tablePagination.numberOfPages, startPage);
    //slice current data set
    const currentData = findCurrentData(
      table.filteredDataFound,
      tablePagination.currentPage,
      tablePagination.rowsPerPage
    );
    const hasBulkActions = props.bulkActions.length
    const filterableColumns = props.records.filter(r => r.filterable).map(c => {
      return {value: c.column, label: c.header}
    })
    return(
      <div>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
                <HeaderSelector hiddenColumnCount = {hiddenColumnCount} columns={table.columns.filter(c => !props.mandatoryFeilds.includes(c.column))} toggleColumns={this.toggleColumns}/>
            </Grid.Column>
            <Grid.Column>
              <Search searchText={table.searchText} fullData={props.data} searchKeys={this.props.searchKeys}
              rowsPerPage={tablePagination.rowsPerPage}
              setSearchedData={this.setSearchedData}/>
            </Grid.Column>
            <Grid.Column>
                {hasBulkActions && table.selectedRows.length ? <BulkActionList bulkActions={this.props.bulkActions} selectedRows={table.selectedRows}/> : null}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <TableFilter filterableColumns={filterableColumns} selectedFilters={table.selectedFilters} addFilter={this.addFilter} removeFilter={this.removeFilter} applyFilter={this.applyFilter} updateSelectedfilters={this.updateSelectedfilters}/>
            </Grid.Column>
          </Grid.Row>
      </Grid>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{hasBulkActions ? <Checkbox checked={table.bulkSelect} onChange={(e, {checked}) => this.enableBulkSelect({checked})}/> : null } Sl.no</Table.HeaderCell>
              {visibleColumns.map((column) => (
                <Table.HeaderCell onClick={() => this.updateDefaultSortable(column)}>{column.column === table.defaultSortable ? <Icon name='arrow down'/> : null } {column.header}</Table.HeaderCell>
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
                  {hasBulkActions ? <Checkbox checked={table.selectedRows.includes(data._id)} onChange={(e, {checked}) => this.updateSelectedRows({checked}, data._id)}/> :  null}
                </Table.Cell>
                {visibleColumns.map(c => c.column).map((cell) => (
                  cell !== 'action' ?
                  <Table.Cell> {props.complexRecords.includes(cell) ? props.findComplexRecords(cell, data[cell])  : data[cell]} </Table.Cell> : <Table.Cell> <TableActions actions={props.actions} ids={data._id}/> </Table.Cell>
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

const mapStateToProps = ({tablePagination, table}) => ({tablePagination, table})

export default connect(
    mapStateToProps,
  )(TableComponent);
