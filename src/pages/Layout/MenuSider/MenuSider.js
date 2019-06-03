import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import logo from '../../../assets/images/logo.svg'
import { withTranslation } from 'react-i18next'

class MenuSider extends Component {
  render () {
    const { t } = this.props
    return (
      <div>
        <div className='logo'>
          <Link to='/⚜️'>
            <img src={logo} alt='logo' />
            <h1>Mia App</h1>
          </Link>
        </div>
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
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
      </div>
    )
  }
}
export default withTranslation()(MenuSider)
