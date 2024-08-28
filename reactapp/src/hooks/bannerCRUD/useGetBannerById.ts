import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { AppDispatch } from 'stores/store';
import { getBannerById } from 'stores/banner/bannerThunks';
import { bannerStore } from 'stores/banner/bannerSlice';
import { BannerState } from 'stores/banner/bannerStateTypes';

const useGetBannerById = (id?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const { record }: BannerState = useSelector(bannerStore);

  useEffect(() => {
    if (!id) return;
    dispatch(getBannerById({ id }));
  }, [dispatch, id]);

  return {
    record,
  };
};

export default useGetBannerById;
