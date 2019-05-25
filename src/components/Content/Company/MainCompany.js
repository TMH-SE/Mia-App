import React, { Component } from 'react'
import CompanyAction from './CompanyAction'
import DataList from './DataList'

export default class MainCompany extends Component {
  constructor (props) {
    super(props)
    this.updateData = this.updateData.bind(this)
    this.cancelUpdate = this.cancelUpdate.bind(this)
    this.state = {
      updateId: ''
    }
  }

  cancelUpdate () {
    this.setState({
      updateId: ''
    })
  }

  updateData (id) {
    this.setState({ updateId: id })
  }

  render () {
    const { isMobile } = this.props
    return (
      <div>
        <div style={{ marginBottom: '15px' }}>
          <CompanyAction updateId={this.state.updateId} cancelUpdate={this.cancelUpdate} isMobile={isMobile} />
        </div>
        <DataList updateData={this.updateData} />
      </div>
    )
  }
}
