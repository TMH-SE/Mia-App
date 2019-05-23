import React, { Component } from 'react'
import { Button, Popconfirm, Icon } from 'antd'

export default class ActionRender extends Component {
  render () {
    return (
      <div>
        <Button style={{ marginRight: '3px' }} size='small' onClick={this.onUpdateTask} type='primary'><Icon type='edit' /> Modify</Button>
        <Popconfirm placement='topLeft' title='Are you sure?' onConfirm okText='Yes' cancelText='No'>
          <Button size='small' type='danger'><Icon type='delete' /> Delete</Button>
        </Popconfirm>
      </div>
    )
  }
}
