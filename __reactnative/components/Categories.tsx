import React, { useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'
import tw from 'tailwind-react-native-classnames'

import { gql, useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/reducers'
import { StackNavigationProp } from '@react-navigation/stack'

const constants = require('../constants.json')

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

export default function Categories({navigation}: {navigation: StackNavigationProp<any>}) {
  const { data, loading } = useQuery<IQuery>(Query)

  const {currentLang} = useSelector((state: RootState) => state.langReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    if(data){
      dispatch({
        type: "SET_CATEGORIES",
        categories: data.getCategories.map(cat => {
          return {
            slug: cat.slug,
            name: cat.title[currentLang]
          }
        })
      })
    }
  }, [data, dispatch, currentLang])

  if(loading) {
    return (
      <View style={tw`p-6`}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={tw`p-6`}>
      
      <View style={tw`pb-6`}>
        <Text style={tw`text-lg font-bold`}>
          {constants['categories-title'][currentLang]}
        </Text>
      </View>
      {
        data?.getCategories.map((category) => {
          return (
            <View key={category.slug}>
              <Pressable
                onPress={() => {
                  navigation.navigate(category.slug, {
                    slug: category.slug
                  })
                }}
              >
                <Card
                  text={category.title[currentLang]}
                />
              </Pressable>
            </View>
          )
        })
      }
    </View>
  )
}


const Card = ({text}: {text: string}) => {
  return(
    <View style={tw`py-16 w-full mb-4 rounded-md border border-gray-100 shadow-md bg-white`}>
      <Text style={tw`text-center text-lg`}>
        {text}
      </Text>
    </View>
  )
}