import React from 'react'
import FlipCard from 'react-native-flip-card'
import { Pressable, Text, View } from 'react-native'
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

  const [active, setActive] = React.useState(0)

  return (
    <View style={tw`bg-yellow-200 justify-center flex-1 py-20 px-6`}>

      {
        words.map((word, index) => {
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
                  <Text style={tw`text-center text-xl`}>{word.translations.english}</Text>
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