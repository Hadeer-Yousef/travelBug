/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SearchTab from '../screens/SearchTab';
import FeedTab from '../screens/FeedTab';
import ProfileTab from '../screens/ProfileTab';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="SearchTab"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="SearchTab"
        component={SearchTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="FeedTab"
        component={FeedTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ProfileTab"
        component={ProfileTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function SearchTabNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="SearchTab"
        component={SearchTab}
        options={{ headerTitle: 'Search' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function FeedTabNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={FeedTab}
        options={{ headerTitle: 'Feed' }}
      />
    </TabTwoStack.Navigator>
  );
}


const TabThreeStack = createStackNavigator();

function ProfileTabNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabTwoStack.Screen
        name="ProfileScreen"
        component={ProfileTab}
        options={{ headerTitle: 'Profile' }}
      />
    </TabThreeStack.Navigator>
  );
}
