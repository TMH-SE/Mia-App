import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

export default class MenuSider extends Component {
  render () {
    return (
      <div>
        <div className='logo'>Mia</div>
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
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
      </div>
    )
  }
}
