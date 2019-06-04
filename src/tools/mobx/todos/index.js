import { observable } from 'mobx'

class TodoStore {
  @observable tasks = [{
    id: '1',
    name: 'Learn mobx',
    status: 'Completed'
  }]
}
export default new TodoStore()
