import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ShopCard = ({
  shopData = {
    type: 'General Store',
    name: 'U2_SANJAY TRADERS',
    route: 'r6',
    area: 'HSR',
    address:
      'AGARWAL SANJAY TRADERS Ramghat Road, Vishnupuri, Near water tank, sector 5C, Agra, UP',
  },
  onPress = () => {},
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        // imgPicker();
        navigation.navigate('Upload', {shop: shopData});
      }}>
      <View style={styles.card}>
        <Text style={styles.name}>{shopData.name}</Text>
        <Text style={styles.type}>{shopData.type}</Text>
        <Text style={styles.area}>{shopData.area}</Text>
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
  },
  name: {
    color: '#D45339',
    fontWeight: 'bold',
    fontSize: 16,
  },
  type: {
    fontSize: 14,
    marginTop: 8,
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
