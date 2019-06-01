import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import withLoadable from '../untils/loadable'
import Main from '../pages/Layout/MainLayout/Main'

export default function PrivateRoute (route) {
  const isLoggedIn = window.localStorage.getItem('token') !== null
	return (
		<Route
			render={props =>
        isLoggedIn ? (
					<Main>
						<Route
							{...route}
							component={props => {
								const MyComponent = withLoadable(
									import(`../pages/${route.component}`)
								)
								return <MyComponent {...props} routes={route.routes} />
							}}
						/>
					</Main>
				) : (
					<Redirect to="/🔞" />
				)
			}
		/>
	)
}