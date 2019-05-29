import React, { Component } from 'react'
import App from './App'
import Login from './components/Login/Login'

export default class Mia extends Component {
  render () {
    const isLoggedIn = window.localStorage.getItem('token') !== null
    return (
      isLoggedIn ? <App /> : <Login />
    )
  }
}
