import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ShopCard from '../../components/ShopCard';
import SearchBar from '../../components/SearchBar';
import AppColors from '../../common/AppColors';
import DatabaseServices from '../../services/DatabaseService';
import {useNavigation} from '@react-navigation/native';
import AppBar from '../../components/AppBar';
import BottomFilterModal from '../../components/BottomFilterModal';
import {useSelector} from 'react-redux';

export default function Dashboard() {
  const [storesData, setstoresData] = useState([]);
  const [pagination, setPagination] = useState({current: 1, total_pages: -1});
  const [search, setSearch] = useState('');
  const [noPagination, setNoPagination] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const {homeFilter: filters} = useSelector(state => state.filter);
  const {storeData: cachedData} = useSelector(state => state.dashboard);
  useEffect(() => {
    initData();
  }, []);

  async function initData() {
    if (cachedData) {
      setstoresData(cachedData);
      setNoPagination(true);
      return;
    }
    const res = await GetApiData({page: 1});
    setstoresData([...storesData, ...res.response]);
    setPagination({total_pages: res.total_pages, current: res.current_page});
    setLoading(false);
  }

  async function handlePagination() {
    if (noPagination) return;
    if (
      pagination.total_pages === -1 ||
      pagination.current <= pagination.total_pages
    ) {
      pagination.current++;
      // setLoading(true);
      const res = await GetApiData();
      setstoresData([...storesData, ...res.response]);
      setPagination({total_pages: res.total_pages, current: res.current_page});
      // setLoading(false);
    }
  }
  async function GetApiData(extra = {}) {
    const ApiRes = await DatabaseServices.getDashboardData({
      page: pagination.current,
      ...extra,
    });
    if (ApiRes.response) return ApiRes;
    return [];
  }

  const renderItem = ({item}) => <ShopCard shopData={item} />;

  const handleFilter = body => {
    setShowFilter(false);
    handleSearch(body);
  };

  async function handleSearch(body = null) {
    setLoading(true);
    setNoPagination(true);
    const filterToBeAdded = body ? body : filters;
    console.log(filterToBeAdded, 'SS');
    const searchedData = cachedData.filter(i => {
      let checked = true;
      if (filterToBeAdded.area) checked = i.area == filterToBeAdded.area;
      else if (filterToBeAdded.route)
        checked = checked && i.route == filterToBeAdded.route;
      else if (filterToBeAdded.type)
        checked = checked && i.type == filterToBeAdded.type;

      return checked;
    });
    setstoresData(searchedData);
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
          <ActivityIndicator size={30} color={AppColors.primary} />
        </View>
      ) : (
        <FlatList
          data={storesData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.2}
          onEndReached={handlePagination}
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
