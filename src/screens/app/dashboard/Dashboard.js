import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppColors from '../../../common/AppColors';
import AppBar from '../../../components/AppBar';
import BottomFilterModal from '../../../components/BottomFilterModal';
import SearchBar from '../../../components/SearchBar';
import {getFilteredSearch} from '../../../util/Util';
import UseDashboard from './CustomHook';

export default function Dashboard() {
  const [
    storesData,
    pagination,
    search,
    noPagination,
    loading,
    showFilter,
    filters,
    setSearch,
    setShowFilter,
    setNoPagination,
    initData,
    handlePagination,
    renderItem,
    handleFilter,
    handleSearch,
  ] = UseDashboard();
  const t = i => i;
  const searchedData = useMemo(
    () => getFilteredSearch(storesData, search),
    [storesData, search],
  );
  return (
    <View style={styles.container}>
      <AppBar />
      <SearchBar
        setSearch={setSearch}
        Search={search}
        onFilterClick={() => setShowFilter(true)}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={30} color={AppColors.primary} />
        </View>
      ) : (
        <FlatList
          data={searchedData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.2}
          onEndReached={handlePagination}
          ListEmptyComponent={() => (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>{t('No Data Found')}</Text>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.footerContainer}>
              {!storesData.length ||
              pagination.current > pagination.total_pages ||
              noPagination ||
              search ? null : (
                <ActivityIndicator size={20} color={AppColors.primary} />
              )}
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={initData}
              progressBackgroundColor={AppColors.primary}
              colors={[AppColors.white]}
            />
          }
        />
      )}
      <BottomFilterModal
        isVisible={showFilter}
        handleCancel={() => {
          setShowFilter(false);
        }}
        onFilterChange={handleFilter}
      />
      {/* <SnackbarCustom visible={true} handleCancel={() => {}} timeOut={2000} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    fontWeight: '500',
    color: AppColors.secondaryText,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
