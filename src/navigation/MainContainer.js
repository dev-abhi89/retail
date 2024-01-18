import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllStoreThunk} from '../redux/dashboard/Action';
import {getDropdownData} from '../redux/filter/Action';
import {getRouteTypeAreaList} from '../util/Util';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function MainContainer() {
  const [usr, setUsr] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {storeData} = useSelector(state => state.dashboard);
  const Authchange = usr => {
    setUsr(usr);
    setLoading(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(Authchange);
    return subscriber;
  }, []);
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
      {usr ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
