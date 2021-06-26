import React from 'react'
import Login from '../components/Login'
import Profile from '../components/Profile'
import Signup from '../components/Signup'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const StackNavigation = () => {

    return (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    );
}

export default StackNavigation