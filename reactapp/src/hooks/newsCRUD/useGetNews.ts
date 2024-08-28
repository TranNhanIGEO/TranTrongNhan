import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NewsViewModel } from 'models/DTOs/newsModel';
import { QueryModel } from 'models/Query/queryModel';
import { getNews } from 'stores/news/newsThunks';
import { AppDispatch } from 'stores/store';
import { newsStore } from 'stores/news/newsSlice';
import { NewsState } from 'stores/news/newsStateTypes';

const useGetNews = (query: QueryModel<NewsViewModel>) => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, records, totalRecords, filteredRecords }: NewsState = useSelector(newsStore);

  useEffect(() => {
    dispatch(getNews({ queryData: query }));
  }, [dispatch, query]);

  return {
    isLoading,
    records,
    totalRecords,
    filteredRecords,
  }
};

export default useGetNews;
