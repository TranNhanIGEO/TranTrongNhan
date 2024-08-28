import useModal from 'components/UI/hooks/useModal';
import { BannerViewModel } from 'models/DTOs/bannerModel';
import { useDispatch, useSelector } from 'react-redux';
import { bannerStore, clearBanner, getBanner } from 'stores/banner/bannerSlice';
import { AppDispatch } from 'stores/store';
import useRemoveBanner from 'hooks/bannerCRUD/useRemoveBanner';
import { BannerState } from 'stores/banner/bannerStateTypes';

const useBannerManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const { record }: BannerState = useSelector(bannerStore);
  const { isOpenModal, openModal, closeModal } = useModal();
  const { handleRemoveBanner } = useRemoveBanner();

  const handleOpenModal = (record: BannerViewModel) => {
    openModal();
    dispatch(getBanner({ isSuccess: true, message: "", record }));
  };

  const handleDeleteBanner = () => {
    closeModal();
    handleRemoveBanner(record.id);
  };

  const handleCloseModal = () => {
    closeModal();
    dispatch(clearBanner());
  }

  return {
    isOpenModal,
    handleCloseModal,
    handleOpenModal,
    handleDeleteBanner,
  };
};

export default useBannerManagement;
