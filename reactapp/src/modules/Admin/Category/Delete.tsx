import { FC } from 'react';
import { useSelector } from 'react-redux';
import { DELETE_MODAL } from 'constants/modal';
import { categoryStore } from 'stores/category/categorySlice';
import { CategoryState } from 'stores/category/categoryStateTypes';
import { DeleteCategoryTypes } from './types/deleteTypes';
import AppModal from 'components/UI/Modal';

const DeleteCategory: FC<DeleteCategoryTypes> = ({ isOpenModal, onCloseModal, onDelete }) => {
  const { record }: CategoryState = useSelector(categoryStore);

  return (
    <AppModal 
      title="Delete Category" 
      type={DELETE_MODAL} 
      isOpen={isOpenModal} 
      onClose={onCloseModal} 
      onSubmit={onDelete}
    >
      <p className='text-center'>Are you sure you want to delete <b>{record.name}</b>?</p>
    </AppModal>
  );
};

export default DeleteCategory;
