import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import AppColors from '../common/AppColors';
import { updateHomeFilter } from '../redux/filter/Action';
import FilterComponent from './FilterUi';

export default function BottomFilterModal({
  isVisible,
  handleCancel,
  onFilterChange,
}) {
  const initialFilters = {
    type: '',
    route: '',
    area: '',
  };
  const { t } = useTranslation(); // Use useTranslation hook
  const { homeFilter: filters } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  function handleClearFilter() {
    dispatch(updateHomeFilter(initialFilters));
    onFilterChange(initialFilters);
  }

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
          <Text style={styles.title}>{t('Apply Filters')}</Text>
          {filters.area || filters.route || filters.type ? (
            <Text onPress={handleClearFilter} style={styles.filterText}>
              {t('Clear All Filters')}
            </Text>
          ) : null}
        </View>
        <FilterComponent
          onClearFilter={handleClearFilter}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.PrimaryText,
  },
  filterText: { fontSize: 14, fontWeight: '600', color: AppColors.primary },
});

// {
//   "Apply Filters": "Apply Filters",
//   "Clear All Filters": "Clear All Filters"
// }