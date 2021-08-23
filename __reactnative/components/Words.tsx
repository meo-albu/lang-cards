import React from 'react'
import FlipCard from 'react-native-flip-card'
import { Pressable, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { gql, useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'
import { RootState } from '../store/reducers'
import AsyncStorage from '@react-native-async-storage/async-storage'

const constants = require('../constants.json')

const Query = gql`
  query Query($slug: String!) {
    getWords(slug: $slug) {
      german
      id
      translations {
        english
        romanian
      }
    }
  }
`

interface IQuery {
  getWords: {
    german: string
    id: string
    translations: {
      english: string
      romanian: string
    }
  }[]
}

export default function Words({route}: {route: any}) {

  const {slug} = route.params

  const { data, loading } = useQuery<IQuery>(Query, {variables: {slug}})

  const {currentLang} = useSelector((state: RootState) => state.langReducer)

  const words = data?.getWords || []

  const [active, setActive] = React.useState(0)
  
  if(loading) return <View><Text>Loading...</Text></View>

  return (
    <View style={tw`bg-yellow-200 justify-center flex-1 py-20 px-6`}>
      {
        words?.map((word, index) => {
          if(index === active)
            return (
              <FlipCard 
                key={word.id}
                style={tw`px-6 bg-white border border-gray-200 rounded-md h-40 flex-1`}
                friction={15}
                perspective={1500}
                flipHorizontal={true}
                flipVertical={false}
                flip={false}
                alignHeight={false}
                clickable={true}
              >
                <View style={tw`flex-1 flex justify-center`}>
                  <Text style={tw`text-center text-xl`}>{word.german}</Text>
                </View>
                <View style={tw`flex-1 flex justify-center`}>
                  <Text style={tw`text-center text-xl`}>
                    {
                      word.translations[currentLang].length > 0
                        ? word.translations[currentLang]
                        : constants['no-translation'][currentLang]
                    }</Text>
                </View>
              </FlipCard>
            )
        })
      }
      <View style={tw`flex flex-row pt-12 justify-between`}>
        <Button
          direction='prev'
          active={active}
          edge={0}
          onPress={() => setActive(prev => prev > 0 ? prev - 1 : 0)}
        />
        <Button
          direction='next'
          active={active}
          edge={words.length - 1}
          onPress={() => setActive(prev => prev < words.length - 1 ? prev + 1 : words.length)}
        />
      </View>
    </View>
  )
}

const Button = ({
    direction,
    active,
    edge,
    onPress
  }: {
    direction: 'prev' | 'next'
    active: number
    edge: number
    onPress: () => void
  }) => {

  return (
    <Pressable
      disabled={active === edge}
      style={({pressed}) => {
        return tw`
          px-10 py-3 rounded-md shadow-sm
          ${active === edge ? 'bg-gray-200' : pressed ? 'bg-yellow-500' : 'bg-yellow-400'}
        `
      }}
      onPress={() => onPress && onPress()}
    >
      <Text>{direction === 'prev' ? 'Prev' : 'Next'}</Text>
    </Pressable>
  )
}