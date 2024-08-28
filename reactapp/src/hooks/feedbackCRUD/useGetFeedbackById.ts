import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { AppDispatch } from 'stores/store';
import { getFeedbackById } from 'stores/feedback/feedbackThunks';
import { feedbackStore } from 'stores/feedback/feedbackSlice';
import { FeedbackState } from 'stores/feedback/feedbackStateTypes';

const useGetFeedbackById = (id?: string) => {
  const dispatch: AppDispatch = useDispatch();
  const { record }: FeedbackState = useSelector(feedbackStore);

  useEffect(() => {
    if (!id) return;
    dispatch(getFeedbackById({ id }));
  }, [dispatch, id]);

  return {
    record,
  };
};

export default useGetFeedbackById;
