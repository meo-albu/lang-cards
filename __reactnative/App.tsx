import Nav from './components/Nav';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames'

import { Provider, useSelector } from 'react-redux'
import { createStore } from 'redux'
import rootReducer, { RootState } from './store/reducers'

import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Heading from './components/Heading';

const {heading} = require('./constants.json')

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

const Main = () => {
  const {langs, currentLang} = useSelector((state: RootState) => state.langReducer)
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
      <Nav />
      <View style={tw`flex-grow p-6`}>
        <Heading level={'1'} style='text-center'>{
          heading[currentLang]
        }</Heading>
      </View>
    </View>
  )
}