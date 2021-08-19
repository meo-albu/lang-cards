import LangPicker from './components/LangPicker';
import React from 'react';
import { View, ScrollView, Text, Button } from 'react-native';
import tw from 'tailwind-react-native-classnames'

import { Provider, useSelector } from 'react-redux'
import { createStore } from 'redux'
import rootReducer, { RootState } from './store/reducers'

import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Heading from './components/Heading'
import Categories from './components/Categories'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const {heading} = require('./constants.json')

const store = createStore(rootReducer)

const Home = () => {
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
        <Heading level={'1'} style='text-center'>{
          heading[currentLang]
        }</Heading>
        <Categories />
      </ScrollView>
    </View>
  )
}

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name=" "
            component={Home}
            options={{ 
              // eslint-disable-next-line react/display-name
              headerRight: () => <LangPicker />
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

