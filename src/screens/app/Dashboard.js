import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ShopCard from '../../components/ShopCard';
import SearchBar from '../../components/SearchBar';
import AppColors from '../../common/AppColors';
import DatabaseServices from '../../services/DatabaseService';
import {useNavigation} from '@react-navigation/native';
import AppBar from '../../components/AppBar';
import BottomFilterModal from '../../components/BottomFilterModal';

export default function Dashboard() {
  const [storesData, setstoresData] = useState([]);
  const [pagination, setPagination] = useState({current: 1, total_pages: -1});
  const [search, setSearch] = useState('');
  const [noPagination, setNoPagination] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    initData();
  }, []);

  async function initData() {
    if (noPagination) return;
    if (
      pagination.total_pages === -1 ||
      pagination.current <= pagination.total_pages
    ) {
      pagination.current++;
      const d = await DatabaseServices.getDashboardData(pagination.current);
      setstoresData([...storesData, ...d.response]);
      setPagination({total_pages: d.total_pages, current: d.current_page});
    }
  }

  const renderItem = ({item}) => (
    <ShopCard
      shopData={item}
      onPress={() => {
        navigation.navigate('Upload');
      }}
    />
  );

  const handleFilter = body => {
    setShowFilter(false);
    setFilters(body);
    handleSearch(body);
  };

  async function handleSearch(body = null) {
    setLoading(true);
    setNoPagination(true);
    const filterToBeAdded = body ? body : filters;
    const searchData = await DatabaseServices.searchStore(
      search,
      filterToBeAdded,
    );
    if (searchData) setstoresData(searchData);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <AppBar />
      <SearchBar
        setSearch={setSearch}
        Search={search}
        onSubmit={handleSearch}
        onFilterClick={() => setShowFilter(true)}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={30} />
        </View>
      ) : (
        <FlatList
          data={storesData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.2}
          onEndReached={initData}
          ListEmptyComponent={() => (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No Data Found</Text>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.footerContainer}>
              {!storesData.length ||
              pagination.current > pagination.total_pages ||
              noPagination ? null : (
                <ActivityIndicator size={20} color={AppColors.primary} />
              )}
            </View>
          )}
        />
      )}
      <BottomFilterModal
        isVisible={showFilter}
        handleCancel={() => {
          setShowFilter(false);
        }}
        onFilterChange={handleFilter}
      />
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
