
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './app/screens/Login'
import Register from './app/screens/Register'
import CustomerScreen from './app/screens/CustomerScreen'
import AddCustomer from './app/screens/AddCustomer'
import CustomerDetail from './app/screens/CustomerDetail'





const Stack = createStackNavigator();

function MyStack(){
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0085E6'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'User Login'}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: 'Register'}}
      />
      <Stack.Screen
        name="CustomerScreen"
        component={CustomerScreen}
        options={{ title: 'Dashboard'}}
      />
      <Stack.Screen
        name="AddCustomer"
        component={AddCustomer}
        options={{ title: 'Customer'}}
      />
      <Stack.Screen
        name="CustomerDetail"
        component={CustomerDetail}
        options={{ title: 'Customer Detail'}}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
       <MyStack />
     </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
