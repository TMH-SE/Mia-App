import React, { Component } from 'react'
import { Button, Form, Input, notification, Drawer, Radio } from 'antd'
import { graphql, compose, withApollo } from 'react-apollo'
import { ADD_COMPANY, GET_ALL_COMPANY, UPDATE_COMPANY } from '../../../assets/graphql/company.query'
import { withTranslation } from 'react-i18next'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class CompanyAction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      idUpdate: ''
    }
    this.updateData = null
    this.name = ''
    this.showDrawer = this.showDrawer.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.focusInput = this.focusInput.bind(this)
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
    this.props.store.globalStore.company.updateData = null
  }

  focusInput (visible) {
    this.updateData = this.props.store.globalStore.company.updateData
    if (visible) {
      if (this.updateData === null) {
        this.name.focus()
      } else {
        const data = this.updateData
        this.props.form.setFieldsValue({
          name: data.name,
          pic: data.pic,
          address: data.address,
          phone: data.phone,
          email: data.email,
          skype: data.skype,
          note: data.note,
          status: data.status
        })
      }
    }
  }

  handleSubmit (e) {
    this.updateData = this.props.store.globalStore.company.updateData
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { name, pic, address, email, phone, skype, note, status } = values
        if (this.updateData === null) {
          this.props.mutate({
            mutation: ADD_COMPANY,
            variables: {
              addDto: {
                name: name,
                pic: pic,
                address: address,
                email: email,
                phone: phone,
                skype: skype,
                note: note,
                status: status,
                user: window.localStorage.getItem('id')
              }
            },
            refetchQueries: [
              { query: GET_ALL_COMPANY, variables: { userId: window.localStorage.getItem('id') } }
            ]
          }).then((data) => {
            notification.success({
              message: 'Success!',
              duration: 1.5,
              placement: 'bottomRight'
            })
            this.props.form.resetFields()
            this.name.focus()
          }
          )
            .catch(err => console.log(err))
        } else {
          this.props.mutate({
            mutation: UPDATE_COMPANY,
            variables: {
              updateDto: {
                _id: this.updateData._id,
                name: name,
                pic: pic,
                address: address,
                email: email,
                phone: phone,
                skype: skype,
                note: note,
                status: status,
                user: window.localStorage.getItem('id')
              }
            },
            refetchQueries: [
              { query: GET_ALL_COMPANY, variables: { userId: window.localStorage.getItem('id') } }
            ]
          }).then((data) => {
            notification.success({
              message: 'Success!',
              duration: 1.5,
              placement: 'bottomRight'
            })
            this.closeDrawer()
          }
          )
            .catch(err => console.log(err))
        }
      }
    })
  }

  validatePhone (rule, value, callback) {
    this.updateData = this.props.store.globalStore.company.updateData
    const form = this.props.form
    const regex = /[0-9]$/
    const regexValid = /^0\d{9,11}/
    if (value && !regex.test(value)) {
      form.setFieldsValue({ phone: value.slice(0, value.length - 1) })
    } else {
      if (value && !regexValid.test(value)) {
        callback('The input not valid Vietnam phone number')
      } else {
        if (this.updateData === null) {
          if (this.props.data.companies.some((c) => c.phone === value)) {
            callback('The phone already exists')
          } else {
            callback()
          }
          // let flag = false
          // this.props.data.companies.forEach(c => {
          //   if (c.phone === value) {
          //     callback('The phone already exists')
          //     flag = true
          //   }
          // })
          // if (!flag) {
          //   callback()
          // }
        } else {
          if (this.props.data.companies.some((c) => c.phone === value && c.phone !== this.updateData.phone)) {
            callback('The phone already exists')
          } else {
            callback()
          }
          // let flag = false
          // this.props.data.companies.forEach(c => {
          //   if (c.phone === value && c.phone !== this.updateData.phone) {
          //     callback('The phone already exists')
          //     flag = true
          //   }
          // })
          // if (!flag) {
          //   callback()
          // }
          // return callback()
        }
      }
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { t } = this.props
    return (
      <div>
        <Button type='primary' shape='round' icon='plus' onClick={this.showDrawer}>{t('Add new company')}</Button>
        <Drawer
          title={t('Add new company')}
          onClose={this.closeDrawer}
          visible={this.state.visible || this.props.store.globalStore.company.updateData !== null}
          width={this.props.isMobile ? '100%' : 720}
          afterVisibleChange={this.focusInput}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label={t('Name')} hasFeedback>
              {getFieldDecorator('name', {
                rules: [{
                  required: true,
                  message: 'Please input company name'
                }]
              })(<Input ref={node => (this.name = node)} />)}
            </Form.Item>
            <Form.Item label='PIC' hasFeedback>
              {getFieldDecorator('pic', {
                rules: [{
                  required: true,
                  message: 'Please input company PIC'
                }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label={t('Address')} hasFeedback>
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
            <Form.Item label={t('Phone')} hasFeedback>
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
            <Form.Item label={t('Note')}>
              {getFieldDecorator('note', {
                rules: []
              })(<Input.TextArea rows={5} />)}
            </Form.Item>
            <Form.Item label={t('Status')}>
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
            <Form.Item style={{ textAlign: 'right', borderTop: '1px solid #e9e9e9', marginTop: '30px', paddingTop: '15px' }}>
              <Button onClick={this.closeDrawer} style={{ marginRight: 8 }}>{t('Cancel')}</Button>
              <Button type='primary' htmlType='submit'>{this.props.store.globalStore.company.updateData === null ? t('Add data') : t('Save changes')}</Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    )
  }
}
export default compose(
  withApollo,
  graphql(ADD_COMPANY),
  graphql(UPDATE_COMPANY), graphql(GET_ALL_COMPANY, {
    options: { variables: { userId: window.localStorage.getItem('id') } }
  })
)(Form.create()(withTranslation()(CompanyAction)))
