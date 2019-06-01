import React, { Component } from 'react'
import { Drawer, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

export default class MenuMobile extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.closeDrawer = this.closeDrawer.bind(this)
  }
  closeDrawer () {
    this.props.closeMenuMobile()
  }
  render () {
    return (
      <Drawer
        title='Menu'
        closable={false}
        visible={this.props.visible}
        onClose={this.closeDrawer}
        placement='left'
        bodyStyle={{ padding: 0 }}
      >
        <Menu theme='light' mode='inline' defaultSelectedKeys={['1']} onSelect={this.closeDrawer}>
          <Menu.Item className='menu-item' key='1'>
            <Link to='/'>
              <Icon type='database' />
              <span>Company Data</span>
            </Link>
          </Menu.Item>
          <Menu.Item className='menu-item' key='2'>
            <Link to='/todo'>
              <Icon type='calendar' />
              <span>Todo List</span>
            </Link>
          </Menu.Item>
          <Menu.Item className='menu-item' key='3'>
            <Link to='profile'>
              <Icon type='user' />
              <span>My Profile</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    )
  }
}
