import React, { Component } from 'react'
import { Dropdown, Menu, Icon, Avatar } from 'antd'

export default class LanguageSetting extends Component {
  constructor (props) {
    super(props)
    this.menu = (
      <Menu selectedKeys={[]}>
        <Menu.Item key='userCenter'>
          <Avatar className='logo-language' style={{ backgroundColor: '#f56a00' }} size={18}>VN</Avatar>
          <span>Vietnamese</span>
        </Menu.Item>
        <Menu.Item key='userinfo'>
          <Avatar className='logo-language' style={{ backgroundColor: '#7265e6' }} size={18}>EN</Avatar>
          <span>English</span>
        </Menu.Item>
        <Menu.Item key='triggerError'>
          <Avatar className='logo-language' style={{ backgroundColor: '#ffbf00' }} size={18}>US</Avatar>
          <span>English (US)</span>
        </Menu.Item>
        <Menu.Item key='logout'>
          <Avatar className='logo-language' style={{ backgroundColor: '#00a2ae' }} size={18}>FR</Avatar>
          <span>French</span>
        </Menu.Item>
      </Menu>
    )
  }
  render () {
    return (
      <Dropdown overlay={this.menu} placement='bottomRight'>
        <div>
          <Icon style={{ fontSize: '16px' }} type='global' />
        </div>
      </Dropdown>
    )
  }
}
