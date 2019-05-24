import React, { Component } from 'react'
import CompanyAction from './CompanyAction'
import DataList from './DataList'

export default class MainCompany extends Component {
  render () {
    const { isMobile } = this.props
    return (
      <div>
        <div style={{ marginBottom: '15px' }}>
          <CompanyAction isMobile={isMobile} />
        </div>
        <DataList />
      </div>
    )
  }
}
