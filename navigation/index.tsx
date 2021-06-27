/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ColorSchemeName, View } from 'react-native';
import { connect } from 'react-redux';
import Firebase from '../config/Firebase';

import NotFoundScreen from '../screens/NotFoundScreen';
import { getUser } from '../store/user';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import SignupStack from './signup-stack';

function Navigation(props: any) {
  const [isLoggedIn, setIsLoggedIn ] = useState(false)
  const [isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    setAuthListener();
  }, []);

  const setAuthListener = () => {
    Firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        setIsLoggedIn(true)
        setIsLoading(false)
        props.getUser(user.uid)
      } else {
        setIsLoggedIn(false)
        setIsLoading(false)
      }
  })
  }
  const renderScreen = () => {
    if(isLoggedIn && !isLoading) {
      return <RootNavigator />
    }

    if(isLoading) {
      return <View style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large"/>
      </View>
    }

    return <SignupStack/>
  }
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme= {DefaultTheme}>
        {
          renderScreen()
        }
    </NavigationContainer>
  );
}
const mapState = (state: any) => {
    return {
        user: state.user
    }
}

const mapDispatch = (dispatch: any) => {
    return {
        getUser: (uid: string) => dispatch(getUser(uid))
    }
}
export default connect(
    mapState,
    mapDispatch
)(Navigation)

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
