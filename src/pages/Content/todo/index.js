import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class TodoList extends Component {
  render () {
    const tasks = this.props.store.globalStore.todo.tasks
    return (
      <div>
        {tasks.map((t, i) => {
          return (
            <ul key={i}>
              <li>{t.id}</li>
              <li>{t.name}</li>
              <li>{t.status}</li>
            </ul>
          )
        })}
      </div>
    )
  }
}
export default TodoList
