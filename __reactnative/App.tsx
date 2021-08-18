import Nav from './components/Nav';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames'

export default function App() {
  return (
    <View style={tw`flex-1`}>
      <Nav />
      <View style={tw`flex-grow p-6`}>
        <Text>invata limba germana</Text>
      </View>
    </View>
  );
}