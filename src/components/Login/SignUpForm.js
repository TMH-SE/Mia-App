import React, { Component } from 'react'
import { Form, Input, Icon, Button, Spin, Alert } from 'antd'
import Recaptcha from 'react-recaptcha'
import { graphql } from 'react-apollo'
import { CREATE_USER } from '../../graphql/user.query'

class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isVerify: false,
      isSuccess: false,
      errMsg: ''
    }
    this.reCaptcha = null
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onLoadCaptcha = this.onLoadCaptcha.bind(this)
    this.verifyCaptcha = this.verifyCaptcha.bind(this)
  }

  componentDidMount () {
    document.title = 'Sign up Mia App'
    document.querySelector('#name').focus()
    if (this.reCaptcha) {
      this.reCaptcha.reset()
      this.reCaptcha.execute()
    }
  }

  onLoadCaptcha () {
    if (this.reCaptcha) {
      this.reCaptcha.reset()
      this.reCaptcha.execute()
    }
  }

  verifyCaptcha (res) {
    console.log(res)
    if (res) {
      this.setState({
        isVerify: true
      })
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    this.reCaptcha.execute()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.state.isVerify) {
          const { name, username, password } = values
          this.props.mutate({
            mutation: CREATE_USER,
            variables: {
              userInfo: {
                name: name,
                username: username,
                password: password
              }
            }
          }).then((d) => {
            this.setState({
              isSuccess: true
            })
            setTimeout(this.props.onLogin, 2000)
          })
            .catch(err => {
              this.setState({
                errMsg: err.graphQLErrors[0].message.message
              })
            })
        }
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Spin spinning={this.state.isSuccess} tip='Welcome to Mia App! Login now...'>
        <h1 className='login-title'>Sign up now!</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item hasFeedback>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!' }]
            })(
              <Input
                autoComplete='off'
                prefix={<Icon type='idcard' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='Name'
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('username', {
              rules: [{
                required: true,
                message: 'Please input your username!'
              }, {
                pattern: new RegExp('^[a-zA-Z]\\w{7,}'),
                message: 'Username has least 8 characters and begin with a alphabet'
              }]
            })(
              <Input
                autoComplete='off'
                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='Username'
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: 'Please input your Password!'
              }, {
                pattern: new RegExp('.{8,}'),
                message: 'Passwords must be at least 8 characters.'
              }]
            })(
              <Input.Password
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
                placeholder='Password'
              />
            )}
          </Form.Item>
          <Form.Item>
            <Recaptcha
              size='invisible'
              ref={(el) => (this.reCaptcha = el)}
              sitekey='6Ld0BaYUAAAAAOW4MxdH1t7XufZJ6RkghNNs_ZmE'
              render='explicit'
              verifyCallback={this.verifyCaptcha}
              onloadCallback={this.onLoadCaptcha}
            />
          </Form.Item>
          <Form.Item>
            {this.state.errMsg !== '' && <Alert message={this.state.errMsg} type='error' showIcon />}
            <Button style={{ width: '100%' }} type='primary' htmlType='submit' className='login-form-button'>
              Sign up
            </Button>
            Are you a member? <Button onClick={this.props.onLogin} type='link' className='login-link' href='#'>Login here</Button>
          </Form.Item>
        </Form>
      </Spin>
    )
  }
}
export default graphql(CREATE_USER)(Form.create()(SignUpForm))
