import { observable } from "mobx"

class CompanyStore {
  @observable updateData = {}
}

export default new CompanyStore()
