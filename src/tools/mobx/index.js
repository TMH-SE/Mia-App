import { observable } from 'mobx'
import CompanyStore  from './company'
import TodoStore from './todos'

class MiaStore {
  @observable globalStore = {
    company: CompanyStore,
    todo: TodoStore
  }
}
export default new MiaStore()
