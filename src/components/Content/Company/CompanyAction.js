import React, { Component } from 'react'
import { Button, Form, Input, notification, Drawer, Radio } from 'antd'
import { graphql, compose, withApollo } from 'react-apollo'
import { ADD_COMPANY, GET_ALL_COMPANY, GET_COMPANY_BY_ID } from '../../../graphql/company.query'

class CompanyAction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      idUpdate: ''
    }
    this.name = ''
    this.inputText = React.createRef()
    this.showDrawer = this.showDrawer.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.focusInput = this.focusInput.bind(this)
    //this.updateData = this.updateData.bind(this)
  }

  showDrawer () {
    this.setState({
      visible: true
    })
  }

  closeDrawer (e) {
    this.setState({
      visible: false
    })
    this.props.form.resetFields()
    this.props.cancelUpdate()
  }

  focusInput (visible) {
    if (visible) {
      if (this.props.updateId === '') {
        this.name.focus()
      } else {
        this.props.client.query({
          query: GET_COMPANY_BY_ID,
          variables: { id: this.props.updateId }
        }).then(result => {
          const { company } = result.data
          this.props.form.setFieldsValue({
            name: company.name,
            address: company.address,
            phone: company.phone,
            email: company.email,
            skype: company.skype,
            note: company.note,
            status: company.status
          })
        })
      }
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { name, address, email, phone, skype, note, status } = values
        this.props.mutate({
          variables: {
            addDto: {
              name: name,
              address: address,
              email: email,
              phone: phone,
              skype: skype,
              note: note,
              status: status
            }
          },
          refetchQueries: [
            { query: GET_ALL_COMPANY }
          ]
        }).then((data) => {
          notification.success({
            message: 'Success!',
            duration: 1.5,
            placement: 'topLeft'
          })
          this.props.form.resetFields()
          this.name.focus()
        }
        )
          .catch(err => console.log(err))
      }
    })
  }

  validatePhone (rule, value, callback) {
    const form = this.props.form
    const regex = /[0-9]$/
    const regexValid = /^0\d{9,11}/
    if (value && !regex.test(value)) {
      form.setFieldsValue({ phone: value.slice(0, value.length - 1) })
    } else {
      if (value && !regexValid.test(value)) {
        callback('The input not valid Vietnam phone number')
      } else {
        let flag = false
        this.props.data.companies.forEach(c => {
          if (c.phone === value) {
            callback('The phone already exists')
            flag = true
          }
        })
        if (!flag) {
          callback()
        }
      }
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Button type='primary' icon='plus' onClick={this.showDrawer}>Add new record</Button>
        <Drawer
          title='Add new company data'
          onClose={this.closeDrawer}
          visible={this.state.visible || this.props.updateId !== ''}
          width={this.props.isMobile ? '100%' : 720}
          afterVisibleChange={this.focusInput}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label='Name' hasFeedback>
              {getFieldDecorator('name', {
                rules: [{
                  required: true,
                  message: 'Please input company name'
                }]
              })(<Input ref={node => (this.name = node)} />)}
            </Form.Item>
            <Form.Item label='Address' hasFeedback>
              {getFieldDecorator('address', {
                rules: [{
                  required: true,
                  message: 'Please input company address'
                }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label='Email' hasFeedback>
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email',
                  message: 'The input not valid email'
                }, {
                  required: true,
                  message: 'Please input company email'
                }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label='Phone' hasFeedback>
              {getFieldDecorator('phone', {
                rules: [{
                  required: true,
                  message: 'Please input company phone'
                }, {
                  validator: this.validatePhone.bind(this)
                }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label='Skype'>
              {getFieldDecorator('skype', {
                rules: []
              })(<Input />)}
            </Form.Item>
            <Form.Item label='Note'>
              {getFieldDecorator('note', {
                rules: []
              })(<Input.TextArea rows={5} />)}
            </Form.Item>
            <Form.Item label='Status'>
              {getFieldDecorator('status', {
                initialValue: 0
              })(
                <Radio.Group>
                  <Radio.Button value={0}>Chưa gọi</Radio.Button>
                  <Radio.Button value={1}>Đã gọi</Radio.Button>
                  <Radio.Button value={2}>Chờ gọi lại</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>Thêm</Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    )
  }
}
export default compose(withApollo, graphql(ADD_COMPANY), graphql(GET_ALL_COMPANY))(Form.create()(CompanyAction))
