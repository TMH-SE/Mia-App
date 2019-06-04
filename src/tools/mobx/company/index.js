import { observable } from "mobx"

class CompanyStore {
  @observable updateData = null
}

export default new CompanyStore()
