import React, { ReactElement, useEffect } from 'react'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import { persistCache } from 'apollo3-cache-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'https://lang-cards.vercel.app/api/words',
  cache
})

export default function Provider({children}: {children: ReactElement | ReactElement[]}) {

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    })
  }, [])

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
