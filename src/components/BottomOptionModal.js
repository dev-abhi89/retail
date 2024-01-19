import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';

import {useTranslation} from 'react-i18next';
import Assets from '../common/Images';
import AppColors from '../common/AppColors';
import Tile from './BottomOptionTile';
import LanguageTile from './BottomRadioTile';

export default function BottomOptionModal({
  data,
  isVisible,
  onCancel,
  isCenter = true,
  language = false,
}) {
  const {t} = useTranslation();

  return (
    <ReactNativeModal
      onDismiss={onCancel}
      isVisible={isVisible}
      backdropOpacity={0.8}
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}
      style={styles.mainModel}>
      <View style={styles.container}>
        {data.map(item => {
          return language ? (
            <LanguageTile key={item.name} item={item} onCancel={onCancel} />
          ) : (
            <Tile key={item.name} item={item} onCancel={onCancel} />
          );
        })}
      </View>
      <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
        <Text style={styles.cancelText}>{t('Cancel')}</Text>
      </TouchableOpacity>
    </ReactNativeModal>
  );
}

export const styles = StyleSheet.create({
  mainModel: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 12,
  },
  container: {
    marginVertical: 12,
    borderRadius: 8,
    backgroundColor: AppColors.white,
  },
  cancelBtn: {
    height: 52,
    borderRadius: 8,
    backgroundColor: AppColors.white,
    justifyContent: 'center',
  },
  cancelText: {
    fontFamily: 'PublicSans-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: AppColors.redModal,
    textAlign: 'center',
  },
  menuBtnCenter: {
    justifyContent: 'center',
    padding: 16,
    flexDirection: 'row',
  },
  menuBtnLeft: {
    padding: 16,
    flexDirection: 'row',
  },
  menuText: {
    marginLeft: 15,
    fontFamily: 'PublicSans-Regular',
    fontSize: 14,
    fontWeight: '400',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
});
