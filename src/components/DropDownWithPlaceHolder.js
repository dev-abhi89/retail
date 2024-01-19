import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import AppColors from '../common/AppColors';
import DropdownComponent from './DropdownComponent';

export default function DropDownWithPlaceHolder({
  handleInputChange,
  value,
  placeholder,
  list,
}) {
  const val = useMemo(() => {
    return value + '';
  }, []);
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{placeholder}:</Text>

      <DropdownComponent list={list} onChange={handleInputChange} value={val} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    marginRight: 8,
    minWidth: 40,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
  button: {
    backgroundColor: AppColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
    flex: 1,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
