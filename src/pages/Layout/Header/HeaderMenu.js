import React, { Component } from 'react'
import { Tooltip, Icon, Badge, Row, Col } from 'antd'
import UserSetting from './UserSetting'
import LanguageSetting from './LanguageSetting'
import { withTranslation } from 'react-i18next'

class HeaderMenu extends Component {
  render () {
    return (
      <Row type='flex' justify='space-around' align='middle' className='header-menu'>
        <Col className='header-menu-items'>
          <Tooltip placement='bottom' title={this.props.t('Help')}>
            <Icon type='question-circle' />
          </Tooltip>
        </Col>
        <Col className='header-menu-items'>
          <Badge dot count={5}>
            <Icon className='header-notice' type='bell' />
          </Badge>
        </Col>
        <Col className='header-menu-items'>
          <UserSetting />
        </Col>
        <Col className='header-menu-items'>
          <LanguageSetting />
        </Col>
      </Row>
    )
  }
}
export default withTranslation()(HeaderMenu)
