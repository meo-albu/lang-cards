import React from 'react'
import { Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

const categories = [
  'general',
  'home',
  'entertainment'
]

export default function Categories() {
  return (
    <View style={tw`p-6`}>
      {
        categories.map(cat => <Card key={cat} text={cat} />)
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