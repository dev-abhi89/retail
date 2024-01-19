import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import Assets from '../common/Images';
import {styles} from './BottomOptionModal';
export default function LanguageTile({item, isCenter, onCancel}) {
  return (
    <TouchableOpacity
      style={isCenter ? styles.menuBtnCenter : styles.menuBtnLeft}
      onPress={() => {
        onCancel();
        item.handler();
      }}>
      {item?.selected ? (
        <Image source={Assets.radioSelected} style={{width: 24, height: 24}} />
      ) : (
        <Image
          source={Assets.radioUnselected}
          style={{width: 24, height: 24}}
        />
      )}

      <Text style={styles.menuText}>{item.name}</Text>
    </TouchableOpacity>
  );
}
