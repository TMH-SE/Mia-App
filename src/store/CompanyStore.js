import { observable, autorun } from 'mobx'

export const companyStore = observable({
  updateID: '12345',
  isUpdate: false
})

autorun(() => {
  console.log(companyStore.updateID)
})
