import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../screens/auth/Login';

const Stk = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stk.Navigator>
      <Stk.Screen name="Login" component={LoginPage} />
    </Stk.Navigator>
  );
}
