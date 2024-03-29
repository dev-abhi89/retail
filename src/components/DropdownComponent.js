import React from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AppColors from '../common/AppColors';

const DropdownComponent = ({list, onChange, value}) => {
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={list}
      search={false}
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={value}
      onChange={onChange}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 8,
    height: 50,
    borderColor: AppColors.secondaryBorder,
    borderWidth: 1,
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: AppColors.secondaryText,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.PrimaryText,
  },
});
