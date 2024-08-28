import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductViewModel } from 'models/DTOs/productModel';
import { QueryModel } from 'models/Query/queryModel';
import { getMoreProducts, getProducts } from 'stores/product/productThunks';
import { AppDispatch } from 'stores/store';
import { productStore } from 'stores/product/productSlice';
import { ProductState } from 'stores/product/productStateTypes';
import { ProductQueryModel } from 'models/Query/productQueryModel';
import { INIT_PAGE_INDEX } from 'constants/table';

const useGetProducts = (query: QueryModel<ProductViewModel> & ProductQueryModel, isAppend: boolean = false) => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, records, totalRecords, filteredRecords }: ProductState = useSelector(productStore);

  useEffect(() => {
    if (isAppend && Number(query.pageIndex) !== INIT_PAGE_INDEX) {
      dispatch(getMoreProducts({ queryData: query }));
    } else {
      dispatch(getProducts({ queryData: query }));
    }
  }, [dispatch, query, isAppend]);

  return {
    isLoading,
    records,
    totalRecords,
    filteredRecords,
  };
};

export default useGetProducts;
