import React, { Component } from 'react'
import { Button, Popconfirm, Icon, Row } from 'antd'
import { graphql, compose } from 'react-apollo'
import { DELETE_COMPANY, GET_ALL_COMPANY } from '../../../graphql/company.query'

class ActionRender extends Component {
  constructor (props) {
    super(props)
    this.deleteCompany = this.deleteCompany.bind(this)
  }
  deleteCompany () {
    const { id } = this.props.data
    this.props.mutate({
      variables: { id: id },
      refetchQueries: [
        { query: GET_ALL_COMPANY }
      ]
    }).then(data => data)
      .catch(err => console.log(err))
  }
  render () {
    return (
      <Row type='flex' justify='space-around'>
        <Popconfirm placement='topLeft' title='Are you sure?' onConfirm={this.deleteCompany} okText='Yes' cancelText='No'>
          <Button size='small' type='danger'><Icon type='delete' /> Delete</Button>
        </Popconfirm>
      </Row>
    )
  }
}

export default compose(graphql(DELETE_COMPANY))(ActionRender)
