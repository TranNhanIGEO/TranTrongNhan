import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { AppDispatch } from 'stores/store';
import { getProductById } from 'stores/product/productThunks';
import { productStore } from 'stores/product/productSlice';
import { ProductState } from 'stores/product/productStateTypes';

const useGetProductById = (id?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const { record }: ProductState = useSelector(productStore);

  useEffect(() => {
    if (!id) return;
    dispatch(getProductById({ id }));
  }, [dispatch, id]);

  return {
    record,
  };
};

export default useGetProductById;
