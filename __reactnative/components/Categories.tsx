import React from 'react'
import { Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

import { gql, useQuery, ApolloQueryResult } from '@apollo/client'

const categories = [
  'general',
  'home',
  'entertainment'
]

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

interface Title {
  english: string
  romanian: string
}

interface GetCategories {
  title: Title
  slug: string
}

interface IQuery {
  getCategories: GetCategories[]
}

export default function Categories({navigation}: any) {
  const { data, loading } = useQuery<ApolloQueryResult<IQuery>>(Query)

  if(loading) {
    return (
      <View style={tw`p-6`}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={tw`p-6`}>
      {
        data.getCategories.map((category) => {
          return (
            <Card
              key={category.slug}
              text={category.title.english}
            />
          )
        })
      }
    </View>
  )
}


const Card = ({text}: {text: string}) => {
  return(
    <View style={tw`py-16 w-full mb-4 rounded-md border border-gray-100 shadow-md bg-white`}>
      <Text style={tw`text-center text-xl`}>
        {text}
      </Text>
    </View>
  )
}