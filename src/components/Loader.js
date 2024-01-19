import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import AppColors from '../common/AppColors';

export default function Loader() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={30} color={AppColors.primary} />
    </View>
  );
}
