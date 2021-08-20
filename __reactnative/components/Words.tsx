import React from 'react'
import FlipCard from 'react-native-flip-card'
import { Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

export default function Words() {

  const words = [
    {
      "id": "0001",
      "german": "ab",
      "translations": {
        "english": "from (e.g. time)",
        "romanian": ""
      }
    },
    {
      "id": "0002",
      "german": "ab und zu",
      "translations": {
        "english": "now and again",
        "romanian": ""
      }
    },
    {
      "id": "0003",
      "german": "Abend (abends)",
      "translations": {
        "english": "(in the) evening",
        "romanian": ""
      }
    },
    {
      "id": "0004",
      "german": "als/ wenn",
      "translations": {
        "english": "when (conj)",
        "romanian": ""
      }
    },
    {
      "id": "0005",
      "german": "bald (bis bald)",
      "translations": {
        "english": "soon (see you…soon!)",
        "romanian": ""
      }
    }
  ]
  return (
    <View style={tw`bg-yellow-200 justify-center flex-1 p-6`}>

      {
        words.map(word => {
          return (
            <FlipCard 
              key={word.id}
              style={tw`p-12 bg-white border border-gray-200 rounded-md h-40 flex-1`}
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
                <Text style={tw`text-center text-xl`}>{word.translations.english}</Text>
              </View>
            </FlipCard>
          )
        })
      }
      <View style={tw`flex-1`}>

      </View>
    </View>
  )
}
