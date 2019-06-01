import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { graphql, compose, withApollo } from 'react-apollo'
import { withTranslation } from 'react-i18next'
import { GET_ALL_COMPANY, UPDATE_COMPANY } from '../../../assets/graphql/company.query'
import StatusRender from './StatusRender'
import ActionRender from './ActionRender'
import NoRowsOverlayCustorm from '../../../untils/NoRowsOverlayCustorm'
import LoadingOverlayCustorm from '../../../untils/LoadingOverlayCustorm'

class DataList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rowData: null
    }
    this.columnDefs = [{
      headerName: this.props.t('Action'), field: '', filter: false, cellRenderer: 'actionRender'
    }, {
      headerName: 'Company Details',
      children: [
        { headerName: 'Name', field: 'name', sortable: true, columnGroupShow: 'close', checkboxSelection: true },
        { headerName: 'PIC', field: 'pic', sortable: true, columnGroupShow: 'open' },
        { headerName: 'Address', field: 'address', sortable: true, columnGroupShow: 'open' }
      ]
    }, {
      headerName: 'Company Contacts',
      children: [
        { headerName: 'Phone', field: 'phone', cellRenderer: (params) => '<a href="tel:' + params.value + '">' + params.value + '</a>', columnGroupShow: 'close' },
        { headerName: 'Skype', field: 'skype', cellRenderer: (params) => '<a href="skype:live:' + params.value + '?chat">' + params.value + '</a>', columnGroupShow: 'close' },
        { headerName: 'Email', field: 'email', cellRenderer: (params) => '<a href="mailto:' + params.value + '">' + params.value + '</a>', columnGroupShow: 'open' }
      ]
    }, {
      headerName: 'Note', field: 'note'
    }, {
      headerName: 'Status',
      field: 'status',
      cellRenderer: 'statusRenderer',
      editable: true
    }]
    this.frameworkComponents = {
      statusRenderer: StatusRender,
      actionRender: ActionRender,
      noRowsOverlayComponent: NoRowsOverlayCustorm,
      loadingOverlayComponent: LoadingOverlayCustorm
    }
    this.defaultColDef = {
      filter: true,
      cellStyle: { display: 'flex', alignItems: 'center' },
      resizable: true
    }
    this.noRowsOverlayComponent = 'noRowsOverlayComponent'
    this.loadingOverlayComponent = 'loadingOverlayComponent'
    this.updateData = this.updateData.bind(this)
    this.onCellValueChanged = this.onCellValueChanged.bind(this)
    this.onGridReady = this.onGridReady.bind(this)
  }

  onGridReady (params) {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    // this.props.client.query({
    //   query: GET_ALL_COMPANY,
    //   variables: {
    //     userId: window.localStorage.getItem('id')
    //   }
    // }).then(r => {
    //   this.setState({
    //     rowData: r.data.companies
    //   })
    // }).catch(err => console.log(err))
    // this.gridApi.sizeColumnsToFit()
  }

  updateData (data) {
    this.props.updateData(data)
  }

  onCellValueChanged (params) {
    const { id, name, pic, address, phone, skype, email, note, status } = params.data
    this.props.mutate({
      mutation: UPDATE_COMPANY,
      variables: {
        updateDto: {
          id: id,
          name: name,
          pic: pic,
          address: address,
          email: email,
          phone: phone,
          skype: skype,
          note: note,
          status: parseInt(status),
          user: window.localStorage.getItem('id')
        }
      },
      refetchQueries: [
        { query: GET_ALL_COMPANY, variables: { userId: window.localStorage.getItem('id') } }
      ]
    }).then()
      .catch(err => console.log(err))
  }

  render () {
    return (
      <div className='ag-theme-balham' style={{ height: '450px', width: '100%' }}>
        <AgGridReact
          rowSelection='multiple'
          defaultColDef={this.defaultColDef}
          updateData={this.updateData}
          animateRows='true'
          rowHeight={40}
          columnDefs={this.columnDefs}
          onGridReady={this.onGridReady}
          rowData={this.props.data.companies}
          frameworkComponents={this.frameworkComponents}
          pagination='true'
          floatingFilter='true'
          onCellValueChanged={this.onCellValueChanged}
          enableRangeSelection='true'
          loadingOverlayComponent={this.loadingOverlayComponent}
          noRowsOverlayComponent={this.noRowsOverlayComponent}
          // onFirstDataRendered={this.onFirstDataRendered.bind(this)}
          // statusBar={this.state.statusBar}
        />
      </div>
    )
  }
}
export default compose(
  graphql(GET_ALL_COMPANY, {
    options: {
      variables: {
        userId: window.localStorage.getItem('id')
      }
    }
  }),
  graphql(UPDATE_COMPANY),
  withApollo
)(withTranslation()(DataList))
