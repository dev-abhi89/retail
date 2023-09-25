import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/app/Dashboard';
import GalleryScreen from '../screens/app/ImageScreen';

const Stk = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stk.Navigator>
      <Stk.Screen
        name="Home"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stk.Screen
        name="Upload"
        component={GalleryScreen}
        // options={{headerShown: false}}
      />
    </Stk.Navigator>
  );
}
