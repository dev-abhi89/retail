import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import AppColors from '../common/AppColors';
import FilterComponent from './FilterUi';

export default function BottomFilterModal({
  isVisible,
  handleCancel,
  onFilterChange,
}) {
  return (
    <ReactNativeModal
      onDismiss={handleCancel}
      isVisible={isVisible}
      backdropOpacity={0.8}
      onBackButtonPress={handleCancel}
      onBackdropPress={handleCancel}
      style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Apply Filters</Text>
        </View>
        <FilterComponent
          cancel={handleCancel}
          onFilterChange={onFilterChange}
        />
      </View>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    paddingHorizontal: 12,
    marginVertical: 12,
    borderRadius: 8,
    backgroundColor: AppColors.white,
  },
  header: {
    paddingVertical: 10,
    marginLeft: 16,
    borderBottomColor: AppColors.secondaryBorder,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.PrimaryText,
  },
});
