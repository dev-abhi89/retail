import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AppColors from '../../common/AppColors';
import {getAllStoreThunk} from '../../redux/dashboard/Action';
import Authservice from '../../services/LoginService';
import showMsg from '../../services/snackBar';

function LoginPage() {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      showMsg(t('Please fill valid data'));
      return;
    }
    setLoading(true);
    try {
      await Authservice.login(email, password);
      dispatch(getAllStoreThunk());
    } catch (e) {
      showMsg(t('Invalid credentials'));
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{t('Wellcome')}</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={t('Email')}
          placeholderTextColor="#003f5c"
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder={t('Password')}
          placeholderTextColor="#003f5c"
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size={20} color={AppColors.white} />
        ) : (
          <Text style={styles.loginText}>{t('LOGIN')}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white, // White background
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#333',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: AppColors.white, // White background
    borderWidth: 1,
    borderColor: '#E5E7EB', // Border color
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black', // Text color
  },
  loginBtn: {
    width: '80%',
    backgroundColor: AppColors.primary,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default LoginPage;
