import React, { Component } from 'react'
import { Layout, Icon } from 'antd'
import MenuMobile from '../MenuSider/MenuMobile'
import MenuSider from '../MenuSider/MenuSider'
import HeaderMenu from '../Header/HeaderMenu'

const { Header, Sider, Content } = Layout
export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
      isMobile: false,
      visible: false
    }
    this.toggle = this.toggle.bind(this)
    this.breakPoint = this.breakPoint.bind(this)
    this.closeMenuMobile = this.closeMenuMobile.bind(this)
  }

  closeMenuMobile () {
    this.setState({
      visible: !this.state.visible
    })
  }

  toggle () {
    if (!this.state.isMobile) {
      this.setState({
        collapsed: !this.state.collapsed
      })
    } else {
      this.setState({
        visible: !this.state.visible
      })
    }
  }

  breakPoint (broken) {
    if (broken) {
      this.setState({
        isMobile: true,
        collapsed: true
      })
    } else {
      this.setState({
        isMobile: false,
        collapsed: false
      })
    }
  }

  render () {
    return (
      <Layout>
        <MenuMobile visible={this.state.visible} closeMenuMobile={this.closeMenuMobile} />
        <Sider
          collapsedWidth={this.state.isMobile ? 0 : 80}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          breakpoint='md'
          onBreakpoint={this.breakPoint}
          width={210}
        >
          <MenuSider />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <HeaderMenu />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: '80vh'
            }}
          >
            { this.props.children }
          </Content>
        </Layout>
      </Layout>
    )
  }
}
