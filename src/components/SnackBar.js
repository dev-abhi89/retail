import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import AppColors from '../common/AppColors';
import Assets from '../common/Images';

const SnackbarCustom = ({
  bg = AppColors.PrimaryText,
  visible,
  handleCancel,
  timeOut,
  titleTxt = 'Images Uploaded',
  iconBG = AppColors.greenCheck,
  txtcolor = AppColors.white,
  sub = 'Images have been Successfully uploaded',
}) => {
  const { width, height } = Dimensions.get('screen');

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        handleCancel();
      }, timeOut);
    }
  }, [visible]);

  return (
    <>
      {visible ? (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Image
              source={Assets.check}
              style={styles.icon}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{titleTxt}</Text>
            <Text style={styles.subText}>{sub}</Text>
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width - 34,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    backgroundColor: AppColors.PrimaryText,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    bottom: 30,
    alignSelf: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: AppColors.greenCheck,
  },
  icon: {
    width: 12,
    height: 12,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    color: AppColors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  subText: {
    color: AppColors.white,
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SnackbarCustom;
