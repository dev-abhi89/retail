import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import ShopCard from '../../../components/ShopCard';
import DatabaseServices from '../../../services/DatabaseService';

export default function UseDashboard() {
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
    if (cachedData?.length) {
      setstoresData(cachedData);
      setNoPagination(true);
      return;
    }
    setLoading(true);
    const res = await GetApiData({page: 1});
    setstoresData(res.response);
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
    const filterToBeAdded = body;
    const searchedData = cachedData.filter(i => {
      let checked = true;

      if (filterToBeAdded.area) checked = i.area == filterToBeAdded.area;
      if (filterToBeAdded.route)
        checked = checked && i.route == filterToBeAdded.route;
      if (filterToBeAdded.type)
        checked = checked && i.type == filterToBeAdded.type;

      return checked;
    });
    setstoresData(searchedData);
    setLoading(false);
  }
  return [
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
  ];
}
