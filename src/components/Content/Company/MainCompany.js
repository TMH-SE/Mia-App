import React, { Component } from 'react'
import AddDataAction from './AddDataAction'
import DataList from './DataList'

export default class MainCompany extends Component {
  render () {
    return (
      <div>
        <div style={{ marginBottom: '15px' }}>
          <AddDataAction isMobile={this.props.isMobile} />
        </div>
        <DataList />
      </div>
    )
  }
}
