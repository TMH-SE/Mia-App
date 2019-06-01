import React, { Component } from 'react'
import { Dropdown, Menu, Icon, Avatar } from 'antd'
import { withTranslation } from 'react-i18next'

class LanguageSetting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      language: 'en'
    }
  }
  onChangeLanguage ({ key }) {
    this.setState({
      language: key
    })
    this.props.i18n.changeLanguage(key)
  }
  render () {
    const menu = (
      <Menu style={{ minWidth: '170px' }} selectable defaultSelectedKeys={[this.state.language]} onClick={this.onChangeLanguage.bind(this)}>
        <Menu.Item className='language' key='en'>
          <Avatar className='logo-language' style={{ backgroundColor: '#7265e6' }} size={18}>EN</Avatar>
          <span>English</span>
        </Menu.Item>
        <Menu.Item className='language' key='vn'>
          <Avatar className='logo-language' style={{ backgroundColor: '#f56a00' }} size={18}>VN</Avatar>
          <span>Tiếng Việt</span>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu} placement='bottomRight'>
        <div className='list-language'>
          <Icon style={{ fontSize: '16px' }} type='global' />
        </div>
      </Dropdown>
    )
  }
}

export default withTranslation()(LanguageSetting)
