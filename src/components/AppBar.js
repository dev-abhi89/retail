import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import AppColors from '../common/AppColors';
import Authservice from '../services/LoginService';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {clearData} from '../redux/dashboard/Action';
import BottomOptionModal from './BottomOptionModal';
import Assets from '../common/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppBar({title = 'Home'}) {
  const {i18n, t} = useTranslation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLanguageeModal, setShowLanguageModal] = useState(false);
  async function handleLogout() {
    console.log('LOGING OUT');
    setLoading(true);
    await Authservice.signout();
    dispatch(clearData());
    setLoading(false);
  }
  const BottomModalData = [
    // {name: t('Profile'), icon: 'profile', handler: () => {}},
    {
      name: t('Switch language'),
      icon: 'translate',
      handler: () => {
        setShowProfileModal(false);
        setShowLanguageModal(true);
      },
    },
    {name: t('Logout'), icon: 'logout', handler: handleLogout},
  ];
  const BottomLanguageModalData = [
    {
      name: 'Hindi',
      icon: '',
      handler: async () => {
        await AsyncStorage.setItem('SELECTED_LANGUAGE', JSON.stringify('hin'));

        i18n.changeLanguage('hin');
      },
      selected: i18n.language == 'hin',
    },
    {
      name: 'English',
      icon: '',
      handler: async () => {
        await AsyncStorage.setItem('SELECTED_LANGUAGE', JSON.stringify('en'));
        i18n.changeLanguage('en');
      },
      selected: i18n.language == 'en',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => setShowProfileModal(true)}
        style={styles.logoutButton}>
        {loading ? (
          <ActivityIndicator size={20} color={AppColors.red} />
        ) : (
          <Image source={Assets.store} style={{width: 28, height: 28}} />
        )}
      </TouchableOpacity>
      <BottomOptionModal
        isVisible={showProfileModal}
        onCancel={() => setShowProfileModal(false)}
        isCenter={false}
        data={BottomModalData}
      />
      <BottomOptionModal
        isVisible={showLanguageeModal}
        onCancel={() => setShowLanguageModal(false)}
        isCenter={false}
        data={BottomLanguageModalData}
        language={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    elevation: 2,
    marginBottom: 16,
    backgroundColor: AppColors.white,
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  title: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.PrimaryText,
  },
  logoutButton: {
    marginRight: 16,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: AppColors.primary,
  },
});
