import React, { Component } from 'react'
import { Layout, Icon } from 'antd'
import './App.css'
import MenuSider from './components/MenuSider/MenuSider'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TodoList from './components/Content/Todo/TodoList'
import Profile from './components/Content/Profile/Profile'
import MainData from './components/Content/CompanyData/MainData'
import MenuMobile from './components/MenuSider/MenuMobile'

const { Header, Sider, Content } = Layout
export default class App extends Component {
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
      <Router>
        <Layout>
          <MenuMobile isMobile={this.state.isMobile} visible={this.state.visible} closeMenuMobile={this.closeMenuMobile} />
          <Sider
            collapsedWidth={this.state.isMobile ? 0 : 80}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            breakpoint='md'
            onBreakpoint={this.breakPoint}
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
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: '80vh'
              }}
            >
              <Route exact path='/' render={() => <MainData isMobile={this.state.isMobile} />} />
              <Route path='/todo' component={TodoList} />
              <Route path='/profile' component={Profile} />
            </Content>
          </Layout>
        </Layout>
      </Router>
    )
  }
}
