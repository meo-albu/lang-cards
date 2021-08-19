import React from 'react'
import { Text, View } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import tw from 'tailwind-react-native-classnames'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootState } from '../store/reducers'

export default function LangPicker() {
  const {langs, currentLang} = useSelector((state: RootState) => state.langReducer)

  const dispatch = useDispatch()
  
  return (
    <View style={tw`flex-row justify-end bg-white`}>
      <Picker
        style={tw`pt-10 w-24`}
        selectedValue={currentLang}
        onValueChange={async(itemValue, itemIndex) => {
          await AsyncStorage.setItem('lang', itemValue)
          dispatch({
            type: 'SET_LANG',
            lang: itemValue
          })
        }}
      >
        {
          langs.map(lang => {
            return (
              <Picker.Item
                key={lang}
                label={lang.substr(0, 2).toUpperCase()}
                value={lang}
              />
            )
          })
        }
      </Picker>
    </View>
  )
}