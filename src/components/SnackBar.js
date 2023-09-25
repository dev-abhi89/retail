import {View, Text, Dimensions, Image} from 'react-native';
import React, {useEffect} from 'react';
import AppColors from '../common/AppColors';


export default function SnackbarCustom({
  bg = AppColors.PrimaryText,
  visible,
  handleCancel,
  timeOut,
  titleTxt = 'Images Uploaded',
  iconBG = AppColors.greenCheck,
  txtcolor = AppColors.white,
  sub = 'Images have been Successfully uploaded',
}) {
  const {width, height} = Dimensions.get('screen');
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
        <View
          style={{
            width: width - 34,
            padding: 16,
            borderRadius: 8,
            marginHorizontal: 16,
            backgroundColor: bg,
            flexDirection: 'row',
            position: 'absolute',
            // justifyContent: 'center',
            alignItems: 'center',
            bottom: 30,
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16,
              backgroundColor: iconBG,
            }}>
            {/* <Icons.Check width={12} height={12} /> */}
            <Image
              source={require('../assets/check.png')}
              style={{width: 12, height: 12}}
            />
          </View>
          <View>
            <Text style={[{color: txtcolor, fontSize: 14, fontWeight: '700'}]}>
              {titleTxt}
            </Text>
            <Text
              style={[
                {
                  color: txtcolor,
                  marginTop: 4,
                  fontSize: 14,
                  fontWeight: '500',
                },
              ]}>
              {sub}
            </Text>
          </View>
        </View>
      ) : null}
    </>
  );
}
