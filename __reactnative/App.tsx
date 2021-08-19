import React from 'react'

import LangPicker from './components/LangPicker'

import ReduxProvider from './store/Provider/Provider'
import ApolloProvider from './apollo/Provider'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import FlipCard from 'react-native-flip-card'

import Home from './components/Home'
import { useSelector } from 'react-redux'
import { RootState } from './store/reducers'
import { Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'

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
              component={WordsScreen}
            />
          )
        })
      }
    </Stack.Navigator>
  )
}

const WordsScreen = () => {
  return(
    <View style={tw`bg-yellow-200 justify-center items-center flex-1`}>
      <FlipCard 
        style={tw`p-12 bg-white rounded-md m-6 shadow-md`}
        friction={15}
        perspective={1500}
        flipHorizontal={true}
        flipVertical={false}
        flip={false}
        alignHeight={true}
        clickable={true}
      >
        <View>
          <Text style={tw`text-center`}>The Face</Text>
        </View>
        <View>
          <Text style={tw`text-center`}>The Back</Text>
        </View>
      </FlipCard>
    </View>
  )
}


