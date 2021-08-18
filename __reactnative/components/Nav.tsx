import React from 'react'
import { Text, View } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import tw from 'tailwind-react-native-classnames'

export default function Nav() {
  const [selectedLanguage, setSelectedLanguage] = React.useState('english')
  return (
    <View style={tw`pt-10 w-full flex-row justify-end shadow-md bg-white`}>
      <Picker
        style={tw`pt-10 w-28`}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }
      >
        <Picker.Item label="RO" value="romanian" />
        <Picker.Item label="EN" value="english" />
      </Picker>
    </View>
  )
}