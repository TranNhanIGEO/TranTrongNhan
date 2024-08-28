import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItemViewModel } from 'models/DTOs/cartItemModel';
import { QueryModel } from 'models/Query/queryModel';
import { getCartsBySessionId } from 'stores/cart/cartThunks';
import { AppDispatch } from 'stores/store';
import { cartStore } from 'stores/cart/cartSlice';
import { CartState } from 'stores/cart/cartStateTypes';
import { CartQueryModel } from 'models/Query/cartQueryModel';

const useGetCartsBySessionId = (query: QueryModel<CartItemViewModel> & CartQueryModel) => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, records, totalRecords, filteredRecords }: CartState = useSelector(cartStore);

  useEffect(() => {
    dispatch(getCartsBySessionId({ queryData: query }));
  }, [dispatch, query]);

  return {
    isLoading,
    records,
    totalRecords,
    filteredRecords,
  };
};

export default useGetCartsBySessionId;
