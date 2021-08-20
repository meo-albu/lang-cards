import React from 'react'

import LangPicker from './components/LangPicker'

import ReduxProvider from './store/Provider/Provider'
import ApolloProvider from './apollo/Provider'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './components/Home'
import { useSelector } from 'react-redux'
import { RootState } from './store/reducers'
import Words from './components/Words'

export default function App() {
  return (
    <NavigationContainer>
      <ReduxProvider>
        <ApolloProvider>
          <Navigation />
        </ApolloProvider>
      </ReduxProvider>
    </NavigationContainer>
  )
}

export const Stack = createNativeStackNavigator()

const Navigation = () => {
  const {categories} = useSelector((state: RootState) => state.categoriesReducer)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ 
          // eslint-disable-next-line react/display-name
          headerRight: () => <LangPicker />
        }}
      />
      {
        categories?.map(cat =>{
          return (
            <Stack.Screen
              key={cat.slug}
              name={cat.slug}
              options={{
                title: cat.name,
                // eslint-disable-next-line react/display-name
                headerRight: () => <LangPicker />
              }}
              component={Words}
            />
          )
        })
      }
    </Stack.Navigator>
  )
}



