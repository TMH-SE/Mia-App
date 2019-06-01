import React, { Component } from 'react'
import { Row, Col } from 'antd'
import LogInForm from './LogInForm'
import SignUpForm from './SignUpForm'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSigup: false
    }
  }
  onSignup () {
    this.setState({
      isSigup: !this.state.isSigup
    })
  }
  render () {
    return (
      <Row className='login-wrapper' type='flex' align='middle'>
        <Col xs={{ span: 16, offset: 4 }} md={{ span: 12, offset: 6 }} className='login-form'>
          {this.state.isSigup ? <SignUpForm onLogin={this.onSignup.bind(this)} /> : <LogInForm onSignup={this.onSignup.bind(this)} />}
        </Col>
      </Row>
    )
  }
}

export default Login
