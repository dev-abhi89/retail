import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import AppColors from '../common/AppColors';

export default function SearchBar({
  Search,
  setSearch,
  containerStyle = {},
  onSubmit = () => {},
  onFilterClick,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.container, {flex: 1, margin: 0}]}>
        <TextInput
          placeholder={`Search Stores`}
          style={styles.textInput}
          value={Search}
          onChangeText={text => {
            setSearch(text);
          }}
          onSubmitEditing={onSubmit}
          placeholderTextColor={AppColors.secondaryText}
        />
        <TouchableOpacity onPress={onSubmit} style={styles.searchIcon}>
          <Image
            source={require('../assets/search.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={onFilterClick}
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          backgroundColor: AppColors.white,
          // elevation: 1,

          borderWidth: 1,
          borderColor: AppColors.secondaryBorder,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 12,
        }}>
        <Image
          source={require('../assets/filter.png')}
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontFamily: 'PublicSans-Regular',
    fontSize: 14,
    backgroundColor: AppColors.white,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.secondaryBorder,
    paddingLeft: 40, // Add left padding to accommodate the icon
  },
  searchIcon: {
    position: 'absolute',
    right: 10, // Adjust the left position to position the icon as needed
    top: 10, // Adjust the top position to center the icon vertically
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 20,
    height: 20,
  },
});
