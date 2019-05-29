import React, { Component } from 'react'
import { Dropdown, Menu, Avatar, Icon } from 'antd'
import { withApollo } from 'react-apollo'
import { USER } from '../../graphql/user.query'

class UserSetting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
    this.menu = (
      <Menu onClick={this.onSelect.bind(this)}>
        <Menu.Item key='userCenter'>
          <Icon type='user' />
          <span>Account Center</span>
        </Menu.Item>
        <Menu.Item key='userinfo'>
          <Icon type='setting' />
          <span>Account Settings</span>
        </Menu.Item>
        <Menu.Item key='triggerError'>
          <Icon type='close-circle' />
          <span>Trigger Error</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key='logout'>
          <Icon type='logout' />
          <span>Log out</span>
        </Menu.Item>
      </Menu>
    )
  }

  componentDidMount () {
    this.props.client.query({
      query: USER,
      variables: {
        id: window.localStorage.getItem('id')
      }
    }).then(r => {
      this.setState({
        name: r.data.user.name
      })
    })
      .catch(err => console.log(err))
  }

  onSelect ({ key }) {
    if (key === 'logout') {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('id')
      window.location.href = ''
    }
  }

  render () {
    return (
      <Dropdown overlay={this.menu} placement='bottomRight'>
        <div className='avatar'>
          <Avatar style={{ backgroundColor: '#00a2ae', marginBottom: '4px' }} size={24} icon='dingding' />
          <span style={{ marginLeft: '5px' }}>{this.state.name}</span>
        </div>
      </Dropdown>
    )
  }
}
export default withApollo(UserSetting)
