import { FC } from 'react';
import { useSelector } from 'react-redux';
import { DELETE_MODAL } from 'constants/modal';
import { newsStore } from 'stores/news/newsSlice';
import { NewsState } from 'stores/news/newsStateTypes';
import { DeleteNewsTypes } from './types/deleteTypes';
import AppModal from 'components/UI/Modal';

const DeleteNews: FC<DeleteNewsTypes> = ({ isOpenModal, onCloseModal, onDelete }) => {
  const { record }: NewsState = useSelector(newsStore);

  return (
    <AppModal 
      title="Delete News" 
      type={DELETE_MODAL} 
      isOpen={isOpenModal} 
      onClose={onCloseModal} 
      onSubmit={onDelete}
    >
      <p className='text-center'>Are you sure you want to delete <b>{record.title}</b>?</p>
    </AppModal>
  );
};

export default DeleteNews;
