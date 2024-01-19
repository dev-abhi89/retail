// FilterComponent.js
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppColors from '../common/AppColors';
import {updateHomeFilter} from '../redux/filter/Action';
import DropDownWithPlaceHolder from './DropDownWithPlaceHolder';

const FilterComponent = ({onFilterChange, cancel}) => {
  const {homeFilter, dropDowndata} = useSelector(state => state.filter);
  const {route, type, area} = useMemo(
    () => JSON.parse(JSON.stringify(dropDowndata)),
    [dropDowndata],
  );
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    type: '',
    route: '',
    area: '',
  });

  const handleInputChange = (field, value) => {
    setFilters(prev => ({...prev, [field]: value}));
  };

  const applyFilters = () => {
    dispatch(updateHomeFilter(filters));
    onFilterChange(filters);
  };

  return (
    <View style={styles.container}>
      <DropDownWithPlaceHolder
        placeholder={t('Type')}
        handleInputChange={val => {
          handleInputChange('type', val.value);
        }}
        list={type}
        value={homeFilter.type}
      />
      <DropDownWithPlaceHolder
        placeholder={t('Route')}
        handleInputChange={val => handleInputChange('route', val.value)}
        list={route}
        value={homeFilter.route}
      />
      <DropDownWithPlaceHolder
        placeholder={t('Area')}
        handleInputChange={val => handleInputChange('area', val.value)}
        list={area}
        value={homeFilter.area}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity style={styles.button} onPress={applyFilters}>
          <Text style={styles.buttonText}>{t('Apply Filters')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: AppColors.red}]}
          onPress={cancel}>
          <Text style={styles.buttonText}>{t('Cancel')}</Text>
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
