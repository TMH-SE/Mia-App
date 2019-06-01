import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { rootRoutes } from './untils/routes'
import PrivateRoute from './untils/PrivateRoute'
import withLoadable from './untils/loadable'

export default class Mia extends Component {
  componentDidMount () {
    let wakeUp = setInterval(() => {
      window.fetch('https://l3oc6.sse.codesandbox.io/graphql')
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }, 30000)
    return () => clearInterval(wakeUp)
  }
  render () {
    const isLogedIn = window.localStorage.getItem('token') !== null
    return (
      <BrowserRouter>
        <Switch>
          {rootRoutes.map((route, i) =>
            route.private === true ? (
              <PrivateRoute key={i} {...route} />
            ) : (
              <Route key={i} {...route} component={props => {
                const MyComponent = withLoadable(import(`./pages/${route.component}`))
                return <MyComponent {...props} routes={route.routes} />
              }} />
            )
          )}
          { isLogedIn ? <Redirect to='/⚜️' />: <Redirect to='/🔞' /> }
        </Switch>
      </BrowserRouter>
    )
  }
}
