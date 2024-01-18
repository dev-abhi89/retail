import React, { useMemo } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import Assets from '../common/Images';
import AppColors from '../common/AppColors';

const SearchBar = ({ Search, setSearch, containerStyle = {}, onSubmit = () => {}, onFilterClick }) => {
  const { t } = useTranslation(); // Use useTranslation hook
  const { homeFilter: filters } = useSelector(state => state.filter);
  const isFiltered = useMemo(() => filters.area || filters.type || filters.route, [filters]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputContainer, { margin: 0 }]}>
        <TextInput
          placeholder={t('Search Stores')}
          style={styles.textInput}
          value={Search}
          onChangeText={text => {
            setSearch(text);
          }}
          onSubmitEditing={onSubmit}
          placeholderTextColor={AppColors.secondaryText}
        />
        <TouchableOpacity onPress={onSubmit} style={styles.searchIcon}>
          <Image source={Assets.search} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={onFilterClick}
        style={[
          styles.filterIconContainer,
          {
            borderColor: isFiltered ? AppColors.primary : AppColors.secondaryBorder,
          },
        ]}>
        <Image source={Assets.filter} style={styles.filterIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.secondaryBorder,
  },
  textInput: {
    flex: 1,
    fontFamily: 'PublicSans-Regular',
    fontSize: 14,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    paddingLeft: 40,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  filterIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
});

export default SearchBar;
