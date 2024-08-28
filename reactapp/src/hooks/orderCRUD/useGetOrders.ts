import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OrderViewModel } from 'models/DTOs/orderModel';
import { QueryModel } from 'models/Query/queryModel';
import { getOrders } from 'stores/order/orderThunks';
import { AppDispatch } from 'stores/store';
import { orderStore } from 'stores/order/orderSlice';
import { OrderState } from 'stores/order/orderStateTypes';

const useGetOrders = (query: QueryModel<OrderViewModel>) => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, records, totalRecords, filteredRecords }: OrderState = useSelector(orderStore);

  useEffect(() => {
    dispatch(getOrders({ queryData: query }));
  }, [dispatch, query]);

  return {
    isLoading,
    records,
    totalRecords,
    filteredRecords,
  }
};

export default useGetOrders;
