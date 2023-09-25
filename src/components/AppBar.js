import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AppColors from '../common/AppColors';
import Authservice from '../services/LoginService';

export default function AppBar({ title = 'Home' }) {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await Authservice.signout();
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        {loading ? (
          <ActivityIndicator size={20} color={AppColors.red} />
        ) : (
          <Text style={styles.logoutButtonText}>Log out</Text>
        )}
      </TouchableOpacity>
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
