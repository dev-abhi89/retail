import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import Assets from '../common/Images';
import {styles} from './BottomOptionModal';
export default function Tile({item, isCenter, onCancel}) {
  return (
    <TouchableOpacity
      style={isCenter ? styles.menuBtnCenter : styles.menuBtnLeft}
      onPress={() => {
        onCancel();
        item.handler();
      }}>
      {item.icon ? (
        <Image source={Assets[item.icon]} style={{width: 24, height: 24}} />
      ) : null}
      <Text style={styles.menuText}>{item.name}</Text>
    </TouchableOpacity>
  );
}
