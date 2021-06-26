import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/stackNavigation'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'


export default function App() {
  return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  }, 
  input: {
    width: '95%',
    margin: 15,
    padding: 8,
    fontSize: 18,
    borderColor: '#cccccc',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
});
