import React, { Component } from 'react'
import { Tag } from 'antd'

export default class StatusRender extends Component {
  constructor (props) {
    super(props)
    this.state = {
      curStatus: props.data.status
    }
  }

  render () {
    return (
      <Tag color={this.state.curStatus === 0 ? '#108ee9' : (this.state.curStatus === 1 ? '#f50' : '#52AC2B')}>
        { this.state.curStatus === 0 ? 'Chưa gọi' : (this.state.curStatus === 1 ? 'Đã gọi' : 'Chờ gọi lại')}
      </Tag>
    )
  }
}
