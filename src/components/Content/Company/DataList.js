import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { graphql } from 'react-apollo'
import { GET_ALL_COMPANY } from '../../../graphql/company.query'
import StatusRender from './StatusRender'
import ActionRender from './ActionRender'

class DataList extends Component {
  constructor (props) {
    super(props)
    this.columnDefs = [{
      headerName: 'Action', field: '', filter: false, cellRenderer: 'actionRender', cellStyle: { display: 'flex', alignItems: 'center' }
    }, {
      headerName: 'Name', field: 'name', sortable: true, filter: true, cellStyle: { display: 'flex', alignItems: 'center' }
    }, {
      headerName: 'Address', field: 'address', sortable: true, filter: true, cellStyle: { display: 'flex', alignItems: 'center' }
    }, {
      headerName: 'Phone', field: 'phone', filter: true, cellStyle: { display: 'flex', alignItems: 'center' }, cellRenderer: (params) => '<a href="tel:' + params.value + '">' + params.value + '</a>'
    }, {
      headerName: 'Email', field: 'email', filter: true, cellStyle: { display: 'flex', alignItems: 'center' }, cellRenderer: (params) => '<a href="mailto:' + params.value + '">' + params.value + '</a>'
    }, {
      headerName: 'Skype', field: 'skype', filter: true, cellStyle: { display: 'flex', alignItems: 'center' }, cellRenderer: (params) => '<a href="skype:' + params.value + '?call">' + params.value + '</a>'
    }, {
      headerName: 'Note', field: 'note', filter: true, editable: true, cellStyle: { display: 'flex', alignItems: 'center' }
    }, {
      headerName: 'Status', field: 'status', filter: true, cellStyle: { display: 'flex', alignItems: 'center' }, cellRenderer: 'statusRenderer'
    }]
    this.frameworkComponents = {
      statusRenderer: StatusRender,
      actionRender: ActionRender
    }
    this.updateData = this.updateData.bind(this)
  }

  updateData (id) {
    this.props.updateData(id)
  }

  render () {
    return (
      <div className='ag-theme-balham' style={{ height: '450px', width: '100%' }}>
        <AgGridReact
          updateData={this.updateData}
          animateRows='true'
          rowHeight={40}
          columnDefs={this.columnDefs}
          rowData={this.props.data.companies}
          frameworkComponents={this.frameworkComponents}
          pagination='true'
          floatingFilter='true'
        />
      </div>
    )
  }
}
export default graphql(GET_ALL_COMPANY)(DataList)
