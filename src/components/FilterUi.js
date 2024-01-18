// FilterComponent.js
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppColors from '../common/AppColors';
import {updateHomeFilter} from '../redux/filter/Action';
import DropDownWithPlaceHolder from './DropDownWithPlaceHolder';

const FilterComponent = ({onFilterChange, cancel}) => {
  const {homeFilter, dropDowndata} = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    type: '',
    route: '',
    area: '',
  });
  const handleInputChange = (field, value) => {
    setFilters({...filters, [field]: value});
  };
  useEffect(() => {
    setFilters({
      type: homeFilter.type,
      route: homeFilter.route,
      area: homeFilter.area,
    });
  }, []);

  const applyFilters = () => {
    dispatch(updateHomeFilter(filters));
    onFilterChange(filters);
  };

  return (
    <View style={styles.container}>
      <DropDownWithPlaceHolder
        placeholder={'Type'}
        handleInputChange={val => handleInputChange('type', val.value)}
        list={dropDowndata?.type}
        value={filters.type}
      />
      <DropDownWithPlaceHolder
        placeholder={'Route'}
        handleInputChange={val => handleInputChange('route', val.value)}
        list={dropDowndata.route}
        value={filters.route}
      />
      <DropDownWithPlaceHolder
        placeholder={'Area'}
        handleInputChange={val => handleInputChange('area', val.value)}
        list={dropDowndata.area}
        value={filters.area}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity style={styles.button} onPress={applyFilters}>
          <Text style={styles.buttonText}>Apply Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: AppColors.red}]}
          onPress={cancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    minWidth: 60,
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

export default FilterComponent;
