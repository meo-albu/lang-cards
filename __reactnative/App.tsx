import Nav from './components/Nav';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './store/reducers'

import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

const Main = () => {
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
        <Text>invata limba germana</Text>
      </View>
    </View>
  )
}