import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FeedbackViewModel } from 'models/DTOs/feedbackModel';
import { QueryModel } from 'models/Query/queryModel';
import { getFeedbacks } from 'stores/feedback/feedbackThunks';
import { AppDispatch } from 'stores/store';
import { feedbackStore } from 'stores/feedback/feedbackSlice';
import { FeedbackState } from 'stores/feedback/feedbackStateTypes';

const useGetFeedbacks = (query: QueryModel<FeedbackViewModel>) => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, records, totalRecords, filteredRecords }: FeedbackState = useSelector(feedbackStore);

  useEffect(() => {
    dispatch(getFeedbacks({ queryData: query }));
  }, [dispatch, query]);

  return {
    isLoading,
    records,
    totalRecords,
    filteredRecords,
  }
};

export default useGetFeedbacks;
