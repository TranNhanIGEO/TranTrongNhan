import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { AppDispatch } from 'stores/store';
import { getOrderById } from 'stores/order/orderThunks';
import { orderStore } from 'stores/order/orderSlice';
import { OrderState } from 'stores/order/orderStateTypes';

const useGetOrderById = (id?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const { record }: OrderState = useSelector(orderStore);

  useEffect(() => {
    if (!id) return;
    dispatch(getOrderById({ id }));
  }, [dispatch, id]);

  return {
    record,
  };
};

export default useGetOrderById;
