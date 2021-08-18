import Head from 'next/head'

import React from 'react'
import { useDispatch } from 'react-redux'

import { gql, useQuery } from '@apollo/client'
import { initializeApollo } from 'apollo'
import Main from 'components/Main'
import Categories from 'components/Categories'

const Query = gql`
  query Query {
    getCategories {
      title {
        english
        romanian
      }
      slug
    }
  }
`

export default function Home() {

  const { data: {getCategories}, loading } = useQuery(Query)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch({
      type: 'SET_LANG',
      lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'english'
    })
  }, [dispatch])

  if (loading) return <span>loading...</span>
  return (
    <div className='font-poppins bg-white'>
      <Head>
        <title>Lang cards</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main />

      <Categories
        categories={getCategories}
      />
    </div>
  )
}

export async function getStaticProps() {

  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: Query,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}