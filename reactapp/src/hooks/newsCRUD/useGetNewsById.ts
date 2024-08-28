import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { AppDispatch } from 'stores/store';
import { getNewsById } from 'stores/news/newsThunks';
import { newsStore } from 'stores/news/newsSlice';
import { NewsState } from 'stores/news/newsStateTypes';

const useGetNewsById = (id?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const { record }: NewsState = useSelector(newsStore);

  useEffect(() => {
    if (!id) return;
    dispatch(getNewsById({ id }));
  }, [dispatch, id]);

  return {
    record,
  };
};

export default useGetNewsById;
