import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { AppDispatch } from 'stores/store';
import { getCategoryById } from 'stores/category/categoryThunks';
import { categoryStore } from 'stores/category/categorySlice';
import { CategoryState } from 'stores/category/categoryStateTypes';

const useGetCategoryById = (id?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const { record }: CategoryState = useSelector(categoryStore);

  useEffect(() => {
    if (!id) return;
    dispatch(getCategoryById({ id }));
  }, [dispatch, id]);

  return {
    record,
  };
};

export default useGetCategoryById;
