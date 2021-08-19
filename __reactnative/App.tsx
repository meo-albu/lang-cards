import React from 'react'

import LangPicker from './components/LangPicker'

import ReduxProvider from './store/Provider/Provider'
import ApolloProvider from './apollo/Provider'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './components/Home'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <ReduxProvider>
        <ApolloProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ 
                // eslint-disable-next-line react/display-name
                headerRight: () => <LangPicker />
              }}
            />
          </Stack.Navigator>
        </ApolloProvider>
      </ReduxProvider>
    </NavigationContainer>
  )
}


