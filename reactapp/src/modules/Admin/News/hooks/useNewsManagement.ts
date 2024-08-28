import useModal from 'components/UI/hooks/useModal';
import { NewsViewModel } from 'models/DTOs/newsModel';
import { useDispatch, useSelector } from 'react-redux';
import { newsStore, clearNewsByRow, getNewsByRow } from 'stores/news/newsSlice';
import { AppDispatch } from 'stores/store';
import useRemoveNews from 'hooks/newsCRUD/useRemoveNews';
import { NewsState } from 'stores/news/newsStateTypes';

const useNewsManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const { record }: NewsState = useSelector(newsStore);
  const { isOpenModal, openModal, closeModal } = useModal();
  const { handleRemoveNews } = useRemoveNews();

  const handleOpenModal = (record: NewsViewModel) => {
    openModal();
    dispatch(getNewsByRow({ isSuccess: true, message: "", record }));
  };

  const handleDeleteNews = () => {
    closeModal();
    handleRemoveNews(record.id);
  };

  const handleCloseModal = () => {
    closeModal();
    dispatch(clearNewsByRow());
  }

  return {
    isOpenModal,
    handleCloseModal,
    handleOpenModal,
    handleDeleteNews,
  };
};

export default useNewsManagement;
