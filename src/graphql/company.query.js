import gql from 'graphql-tag'

export const GET_ALL_COMPANY = gql`
  query getAllCompany {
    companies {
      id,
      name,
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
      id,
      name,
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
      id,
      name,
      address,
      phone,
      email,
      skype,
      note,
      status
    }
  }
`

export const UPDATE_COMPANY = gql`
  mutation updateCompany ($update: UpdateCompanyDto){
    updateCompany(updateCompanyDto: $update){
      id,
      name,
      address,
      phone,
      email,
      skype,
      note,
      status
    }
  }
`
