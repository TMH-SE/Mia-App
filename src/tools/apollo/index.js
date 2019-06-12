import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
// import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink } from 'apollo-link'
// import { getMainDefinition } from 'apollo-utilities'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'same-origin'
})

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:5000/`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       authToken: 'authentoken'
//     }
//   }
// })

// const terminallink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query)
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     )
//   },
//   wsLink,
//   httpLink
// )

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      userId: window.localStorage.getItem('id')
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const link = ApolloLink.from([
  authLink,
  errorLink,
  httpLink // http link must be end of array
])

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

export default client
