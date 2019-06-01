import React, { Component } from 'react'
import { Empty } from 'antd'

export default class NoRowsOverlayCustorm extends Component {
  render () {
    return (
      <Empty imageStyle={{ height: '80px'}} image={Empty.PRESENTED_IMAGE_SIMPLE} />
    )
  }
}
