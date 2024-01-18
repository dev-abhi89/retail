import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Assets from '../common/Images';
import AppColors from '../common/AppColors';

const ShopCard = ({shopData}) => {
  const navigation = useNavigation();
  const name = useMemo(() => {
    try {
      return shopData.name.split('U1_')[1];
    } catch {
      return shopData.name;
    }
  }, [shopData]);

  return (
    <TouchableOpacity
      onPress={() => {
        // imgPicker();
        navigation.navigate('Upload', {shop: shopData});
      }}>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flex: 1,
          }}>
          <Image
            source={Assets.store}
            style={{width: 40, height: 40, marginRight: 8}}
          />

          <View style={{flex: 1}}>
            <Text style={styles.name}>{name}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <Text style={styles.type}>{shopData.type}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: AppColors.secondaryBorder,
              borderRadius: 16,
              paddingVertical: 4,
              paddingHorizontal: 8,
              justifyContent: 'center',
              alignItems: 'center',
              height: 32,
              backgroundColor: AppColors.whiteChatBackground,
            }}>
            <Image
              source={Assets.location}
              style={{width: 14, height: 14, marginRight: 8}}
            />
            <Text style={styles.area}>{shopData.area}</Text>
          </View>
        </View>
        <Text style={styles.address}>{shopData.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flex: 1,
  },
  name: {
    color: '#D45339',
    fontWeight: 'bold',
    fontSize: 16,
  },
  type: {
    fontSize: 12,
    marginTop: 0,
    fontWeight: '700',
    color: AppColors.secondaryText,
  },
  area: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  address: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default ShopCard;
