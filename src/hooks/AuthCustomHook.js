import React, {useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

export default function UseAuth() {
  const [usr, setUsr] = useState(null);
  const [loading, setLoading] = useState(true);
  const {refreshApp} = useSelector(state => state.filter);
  const {i18n} = useTranslation();

  const Authchange = usr => {
    setUsr(usr);
    setLoading(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(Authchange);
    return subscriber;
  }, []);
  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('SELECTED_LANGUAGE').then(val => {
      if (val) i18n.changeLanguage(JSON.parse(val));
      setLoading(false);
    });
  }, [refreshApp]);

  return [usr, loading];
}
