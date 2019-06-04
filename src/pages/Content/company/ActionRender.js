import React, { Component } from 'react'
import { Button, Popconfirm, Icon, Row, notification } from 'antd'
import { graphql, compose } from 'react-apollo'
import { DELETE_COMPANY, GET_ALL_COMPANY } from '../../../assets/graphql/company.query'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class ActionRender extends Component {
  constructor (props) {
    super(props)
    this.deleteCompany = this.deleteCompany.bind(this)
    this.updateData = this.updateData.bind(this)
    this.agGrid = this.props.agGridReact
  }
  deleteCompany () {
    const { id } = this.props.data
    this.props.mutate({
      variables: { id: id },
      refetchQueries: [
        { query: GET_ALL_COMPANY }
      ]
    }).then(data => notification.success({
      message: 'Delete success!',
      placement: 'bottomRight',
      duration: 1.25
    }))
      .catch(err => console.log(err))
  }

  updateData () {
    this.props.store.globalStore.company.updateData = this.props.data
    this.agGrid.props.updateData(this.props.data)
  }

  render () {
    return (
      <Row>
        <Button style={{ marginRight: '5px' }} type='primary' size='small' icon='edit' onClick={this.updateData}>Modify</Button>
        <Popconfirm placement='topLeft' title='Are you sure?' onConfirm={this.deleteCompany} okText='Yes' cancelText='No'>
          <Button size='small' type='danger'><Icon type='delete' /> Delete</Button>
        </Popconfirm>
      </Row>
    )
  }
}

export default compose(graphql(DELETE_COMPANY))(ActionRender)
