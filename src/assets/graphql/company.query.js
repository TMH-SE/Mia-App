import gql from 'graphql-tag'

export const GET_ALL_COMPANY = gql`
  query getAll ($userId: String!) {
    companies(userId: $userId) {
      _id,
      name,
      pic,
      address,
      phone,
      email,
      skype,
      note,
      status
    }
  }
`

export const GET_COMPANY_BY_ID = gql`
  query getCompanyById ($id: String!){
    company(id: $id) {
      _id,
      name,
      pic,
      address,
      phone,
      email,
      skype,
      note,
      status
    }
  }
`

export const ADD_COMPANY = gql`
  mutation addCompany ($addDto: AddCompanyDto){
    addCompany(addCompanyDto: $addDto){
      _id,
      name,
      pic,
      address,
      phone,
      email,
      skype,
      note,
      status
    }
  }
`

export const DELETE_COMPANY = gql`
  mutation deleteCompany ($id: String) {
    deleteCompany (companyId: $id) {
      _id
    }
  }
`

export const UPDATE_COMPANY = gql`
  mutation updateCompany ($updateDto: UpdateCompanyDto){
    updateCompany(updateCompanyDto: $updateDto){
      _id,
      name,
      pic,
      address,
      phone,
      email,
      skype,
      note,
      status
    }
  }
`
