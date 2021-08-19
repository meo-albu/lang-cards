import React, { ReactElement } from 'react'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://lang-cards.vercel.app/api/words',
  cache: new InMemoryCache()
})

export default function Provider({children}: {children: ReactElement | ReactElement[]}) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
