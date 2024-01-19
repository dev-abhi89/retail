import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GalleryScreen from '../screens/app/ImageScreen';
import Dashboard from '../screens/app/dashboard/Dashboard';

const Stk = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stk.Navigator>
      <Stk.Screen
        name="Home"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stk.Screen name="Upload" component={GalleryScreen} />
    </Stk.Navigator>
  );
}
