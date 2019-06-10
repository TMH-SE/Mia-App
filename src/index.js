import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.css'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'mobx-react'
import * as serviceWorker from './serviceWorker'
import Mia from './Mia'
import { I18nextProvider } from 'react-i18next'
import i18n from './untils/i18n'
import MiaStore from './tools/mobx'

const client = new ApolloClient({ uri: 'https://66s2q.sse.codesandbox.io/graphql' })

const T = () => (
  <ApolloProvider client={client} >
    <I18nextProvider i18n={i18n}>
      <Provider store={MiaStore}>
        <Mia />
      </Provider>
    </I18nextProvider>
  </ApolloProvider>
)

ReactDOM.render(<T />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
