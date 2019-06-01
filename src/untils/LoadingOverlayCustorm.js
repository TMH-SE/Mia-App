import React, { Component } from 'react'
import { Spin } from 'antd'

export default class LoadingOverlayCustorm extends Component {
  render () {
    return (
      <Spin tip='Fetching data...' size='large' />
    )
  }
}
