import gql from 'raphql-tag'

export const LOG_IN = gql`
  query login ($loginInfo: LoginInfoDto) {
    login(loginInfo: $loginInfo){
      token,
      id
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser ($userInfo: CreateUserInfoDto) {
    createUser(userInfo: $userInfo) {
      id,
      username,
      password
    }
  }
`
