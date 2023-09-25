import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Dashboard from '../screens/app/Dashboard';
import LoginPage from '../screens/auth/Login';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Stk = createNativeStackNavigator();

export default function MainContainer() {
  const [usr, setUsr] = useState(null);
  const [loading, setLoading] = useState(false);
  const Authchange = usr => {
    setUsr(usr);
    setLoading(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(Authchange);
    return subscriber;
  }, []);
  return (
    <NavigationContainer>
      {usr ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
