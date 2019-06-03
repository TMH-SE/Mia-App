import React, { Component } from 'react'
import CompanyAction from './CompanyAction'
import DataList from './DataList'

export default class MainCompany extends Component {
  constructor (props) {
    super(props)
    this.updateData = this.updateData.bind(this)
    this.cancelUpdate = this.cancelUpdate.bind(this)
    this.state = {
      updateData: null
    }
  }

  cancelUpdate () {
    this.setState({
      updateData: null
    })
  }

  updateData (data) {
    this.setState({ updateData: data })
  }

  render () {
    const { isMobile } = this.props
    return (
      <div>
        <div style={{ marginBottom: '15px', textAlign: 'right' }}>
          <CompanyAction updateData={this.state.updateData} cancelUpdate={this.cancelUpdate} isMobile={isMobile} />
        </div>
        <DataList updateData={this.updateData} />
      </div>
    )
  }
}
