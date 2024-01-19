import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import {getAllStoreThunk} from '../redux/dashboard/Action';
import {getDropdownData} from '../redux/filter/Action';
import {getRouteTypeAreaList} from '../util/Util';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import UseAuth from '../hooks/AuthCustomHook';
import useConnectivity from '../hooks/connectivityCustomHook';
import useNotification from '../hooks/NotificationCustomHook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

export default function MainContainer() {
  const dispatch = useDispatch();
  const {storeData} = useSelector(state => state.dashboard);
  const {i18n} = useTranslation();
  const [usr, loading] = UseAuth();
  const [] = useNotification();
  const [] = useConnectivity();

  useEffect(() => {
    if (!storeData?.length) dispatch(getAllStoreThunk());
  }, []);
  useEffect(() => {
    if (storeData.length) {
      dispatch(getDropdownData(getRouteTypeAreaList(storeData)));
    }
  }, [storeData]);

  return (
    <NavigationContainer>
      {loading ? <Loader /> : usr ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
