import useModal from 'components/UI/hooks/useModal';
import { FeedbackViewModel } from 'models/DTOs/feedbackModel';
import { useDispatch, useSelector } from 'react-redux';
import { feedbackStore, clearFeedback, getFeedback } from 'stores/feedback/feedbackSlice';
import { AppDispatch } from 'stores/store';
import useRemoveFeedback from 'hooks/feedbackCRUD/useRemoveFeedback';
import { FeedbackState } from 'stores/feedback/feedbackStateTypes';

const useFeedbackManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const { record }: FeedbackState = useSelector(feedbackStore);
  const { isOpenModal, openModal, closeModal } = useModal();
  const { handleRemoveFeedback } = useRemoveFeedback();

  const handleOpenModal = (record: FeedbackViewModel) => {
    openModal();
    dispatch(getFeedback({ isSuccess: true, message: "", record }));
  };

  const handleDeleteFeedback = () => {
    closeModal();
    handleRemoveFeedback(record.id);
  };

  const handleCloseModal = () => {
    closeModal();
    dispatch(clearFeedback());
  }

  return {
    isOpenModal,
    handleCloseModal,
    handleOpenModal,
    handleDeleteFeedback,
  };
};

export default useFeedbackManagement;
