import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { AppDispatch } from 'stores/store';
import { getPromotionById } from 'stores/promotion/promotionThunks';
import { promotionStore } from 'stores/promotion/promotionSlice';
import { PromotionState } from 'stores/promotion/promotionStateTypes';

const useGetPromotionById = (id?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const { record }: PromotionState = useSelector(promotionStore);

  useEffect(() => {
    if (!id) return;
    dispatch(getPromotionById({ id }));
  }, [dispatch, id]);

  return {
    record,
  };
};

export default useGetPromotionById;
