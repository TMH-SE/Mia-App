import gql from 'graphql-tag'

export const LOG_IN = gql`
  query login ($loginInfo: LoginInfoDto) {
    login (loginInfo: $loginInfo){
      id,
      token
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($userInfo: CreateUserInfoDto){
    createUser(userInfo: $userInfo){
      name,
      username,
      password
    }
  }
`

export const USER = gql`
  query getUser ($id: String!) {
    user (userId: $id) {
      name
    }
  }
`
