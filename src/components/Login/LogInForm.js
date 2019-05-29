import React, { Component } from 'react'
import { Form, Input, Icon, Row, Col, Checkbox, Button, Spin, Alert } from 'antd'
import { withApollo } from 'react-apollo'
import { LOG_IN } from '../../graphql/user.query'

class LogInForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errMsg: '',
      isSuccess: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { username, password } = values
      if (!err) {
        this.props.client.query({
          query: LOG_IN,
          variables: {
            loginInfo: {
              username: username,
              password: password
            }
          }
        }).then(res => {
          const { id, token } = res.data.login
          this.setState({
            isSuccess: true
          })
          setTimeout(() => {
            window.localStorage.setItem('id', id)
            window.localStorage.setItem('token', token)
            window.location.href = ''
          }, 2000)
        })
          .catch(err => {
            this.setState({
              errMsg: err.graphQLErrors[0].message.message
            })
          })
      }
    })
  }
  onSignup () {
    this.props.onSignup()
  }
  render () {
    console.log(this.state.errMsg)
    const { getFieldDecorator } = this.props.form
    return (
      <Spin spinning={this.state.isSuccess} tip='Log in Mia App...'>
        <h1 className='login-title'>Welcome to Mia App!</h1>
        {this.state.errMsg !== '' && <Alert type='error' message={this.state.errMsg} showIcon />}
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(
              <Input
                autoComplete='off'
                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='Username'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }]
            })(
              <Input.Password
                autoComplete='off'
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
                placeholder='Password'
              />
            )}
          </Form.Item>
          <Form.Item>
            <Row type='flex'>
              <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 1 }}>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(<Checkbox>Remember me</Checkbox>)}
              </Col>
              <Col xs={{ span: 24, order: 1 }} md={{ span: 12, order: 2 }} className='login-forgot-pwd' >
                <Button className='login-link' type='link'>Forgot password</Button>
              </Col>
            </Row>
            <Button style={{ width: '100%' }} type='primary' htmlType='submit'>
              Log in
            </Button>
            Or <Button onClick={this.onSignup.bind(this)} className='login-link' type='link'>register now!</Button>
          </Form.Item>
        </Form>
      </Spin>
    )
  }
}

export default withApollo(Form.create()(LogInForm))
