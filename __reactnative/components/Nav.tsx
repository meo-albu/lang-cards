import React from 'react'
import { Text, View } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import tw from 'tailwind-react-native-classnames'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootState } from '../store/reducers'

export default function Nav() {
  const {langs, currentLang} = useSelector((state: RootState) => state.langReducer)

  const dispatch = useDispatch()
  
  return (
    <View style={tw`pt-10 w-full flex-row justify-end shadow-md bg-white`}>
      <Picker
        style={tw`pt-10 w-28`}
        selectedValue={currentLang}
        onValueChange={async(itemValue, itemIndex) => {
          await AsyncStorage.setItem('lang', itemValue)
          dispatch({
            type: 'SET_LANG',
            lang: itemValue
          })
        }}
      >
        <Picker.Item label="RO" value="romanian" />
        <Picker.Item label="EN" value="english" />
      </Picker>
    </View>
  )
}