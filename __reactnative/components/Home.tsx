import React from 'react'
import { ScrollView, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'

import Heading from './Heading'
import Categories from './Categories'

import { RootState } from '../store/reducers'
import { useDispatch, useSelector } from 'react-redux'

import tw from 'tailwind-react-native-classnames'
import AsyncStorage from '@react-native-async-storage/async-storage'

const {heading} = require('../constants.json')

const Home = ({navigation}: {navigation: StackNavigationProp<any>}) => {
  const {currentLang} = useSelector((state: RootState) => state.langReducer)
  const dispatch = useDispatch()

  React.useEffect(() => {
    async function setLang() {
      dispatch({
        type: 'SET_LANG',
        lang: await AsyncStorage.getItem('lang') ? await AsyncStorage.getItem('lang') : 'english'
      })
    }
    setLang()
  }, [dispatch])

  return (
    <View style={tw`flex-1`}>
      <ScrollView>
        <Heading level={'1'} style='text-center p-6'>{heading[currentLang]}</Heading>
        <Categories navigation={navigation} />
      </ScrollView>
    </View>
  )
}

export default Home
