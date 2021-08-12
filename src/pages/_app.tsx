import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client"
import { useApollo } from "apollo"

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from 'store/reducers'
import Nav from 'components/Nav'

const store = createStore(rootReducer)

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Nav />
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  )
}
export default MyApp
