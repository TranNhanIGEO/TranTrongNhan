import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PromotionViewModel } from 'models/DTOs/promotionModel';
import { QueryModel } from 'models/Query/queryModel';
import { getPromotions } from 'stores/promotion/promotionThunks';
import { AppDispatch } from 'stores/store';
import { promotionStore } from 'stores/promotion/promotionSlice';
import { PromotionState } from 'stores/promotion/promotionStateTypes';

const useGetPromotions = (query: QueryModel<PromotionViewModel>, categoryId?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, records, totalRecords, filteredRecords }: PromotionState = useSelector(promotionStore);

  useEffect(() => {
    dispatch(getPromotions({ queryData: query, id: categoryId }));
  }, [dispatch, query, categoryId]);

  return {
    isLoading,
    records,
    totalRecords,
    filteredRecords,
  }
};

export default useGetPromotions;
