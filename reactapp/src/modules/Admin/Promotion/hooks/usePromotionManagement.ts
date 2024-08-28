import useModal from 'components/UI/hooks/useModal';
import { PromotionViewModel } from 'models/DTOs/promotionModel';
import { useDispatch, useSelector } from 'react-redux';
import { promotionStore, clearPromotion, getPromotion } from 'stores/promotion/promotionSlice';
import { AppDispatch } from 'stores/store';
import { PromotionState } from 'stores/promotion/promotionStateTypes';
import useRemovePromotion from 'hooks/promotionCRUD/useRemovePromotion';

const usePromotionManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const { record }: PromotionState = useSelector(promotionStore);
  const { isOpenModal, openModal, closeModal } = useModal();
  const { handleRemovePromotion } = useRemovePromotion();

  const handleOpenModal = (record: PromotionViewModel) => {
    openModal();
    dispatch(getPromotion({ isSuccess: true, message: "", record }));
  };

  const handleDeletePromotion = () => {
    closeModal();
    handleRemovePromotion(record.id);
  };

  const handleCloseModal = () => {
    closeModal();
    dispatch(clearPromotion());
  }

  return {
    isOpenModal,
    handleCloseModal,
    handleOpenModal,
    handleDeletePromotion,
  };
};

export default usePromotionManagement;
