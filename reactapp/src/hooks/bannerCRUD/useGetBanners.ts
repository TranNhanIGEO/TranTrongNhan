import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BannerViewModel } from 'models/DTOs/bannerModel';
import { QueryModel } from 'models/Query/queryModel';
import { getBanners } from 'stores/banner/bannerThunks';
import { AppDispatch } from 'stores/store';
import { bannerStore } from 'stores/banner/bannerSlice';
import { BannerState } from 'stores/banner/bannerStateTypes';

const useGetBanners = (query: QueryModel<BannerViewModel>) => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, records, totalRecords, filteredRecords }: BannerState = useSelector(bannerStore);

  useEffect(() => {
    dispatch(getBanners({ queryData: query }));
  }, [dispatch, query]);

  return {
    isLoading,
    records,
    totalRecords,
    filteredRecords,
  }
};

export default useGetBanners;
