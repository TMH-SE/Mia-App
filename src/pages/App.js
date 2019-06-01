import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import withLoadable from '../untils/loadable'

export default class App extends Component {
  render () {
    const { routes } = this.props
    return (
      <Switch>
        {routes && routes.map((route, i) => {
          return (
            <Route
              key={i}
              {...route}
              component={props => {
                const MyComponent = withLoadable(import(`../pages/Content/${route.component}`))
                return <MyComponent {...props} routes={route.routes} />
              }}
            />
          )
        })}
      </Switch>
    )
  }
}

