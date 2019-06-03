import React, { Component } from 'react'
import { Drawer, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import logo from '../../../assets/images/logo.svg'

class MenuMobile extends Component {
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
    const { t } = this.props
    return (
      <Drawer
        closable={false}
        visible={this.props.visible}
        onClose={this.closeDrawer}
        placement='left'
        bodyStyle={{ padding: 0 }}
      >
        <div className='logo'>
          <img src={logo} alt='logo' />
          <h1>Mia App</h1>
        </div>
        <Menu theme='light' mode='inline' defaultSelectedKeys={['1']} onSelect={this.closeDrawer}>
          <Menu.Item className='menu-item' key='1'>
            <Link to='/⚜️'>
              <Icon type='database' />
              <span>{t('Company Data')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item className='menu-item' key='2'>
            <Link to='/⚜️/todo'>
              <Icon type='calendar' />
              <span>{t('Todo List')}</span>
            </Link>
          </Menu.Item>
          <Menu.Item className='menu-item' key='3'>
            <Link to='/⚜️/profile'>
              <Icon type='user' />
              <span>{t('My Profile')}</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    )
  }
}
export default withTranslation()(MenuMobile)
