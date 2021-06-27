import React from 'react';
import Login from '../screens/LoginScreen';
import Signup from '../screens/SignupScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const SignupStack = () => {

    return (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    );
}

export default SignupStack