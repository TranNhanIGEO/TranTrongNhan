import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CategoryViewModel } from 'models/DTOs/categoryModel';
import { QueryModel } from 'models/Query/queryModel';
import { getCategories } from 'stores/category/categoryThunks';
import { AppDispatch } from 'stores/store';
import { categoryStore } from 'stores/category/categorySlice';
import { CategoryState } from 'stores/category/categoryStateTypes';

const useGetCategories = (query: QueryModel<CategoryViewModel>) => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, records, totalRecords, filteredRecords }: CategoryState = useSelector(categoryStore);

  useEffect(() => {
    dispatch(getCategories({ queryData: query }));
  }, [dispatch, query]);

  return {
    isLoading,
    records,
    totalRecords,
    filteredRecords,
  }
};

export default useGetCategories;
