import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.css'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import * as serviceWorker from './serviceWorker'
import Mia from './Mia'

const client = new ApolloClient({ uri: 'https://1bqu5.sse.codesandbox.io/graphql', cache: new InMemoryCache() })

const T = () => (
  <ApolloProvider client={client} >
    <Mia />
  </ApolloProvider>
)

ReactDOM.render(<T />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
