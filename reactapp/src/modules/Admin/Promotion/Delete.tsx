import { FC } from 'react';
import { DELETE_MODAL } from 'constants/modal';
import { DeletePromotionTypes } from './types/deleteTypes';
import AppModal from 'components/UI/Modal';

const DeletePromotion: FC<DeletePromotionTypes> = ({ isOpenModal, onCloseModal, onDelete }) => {
  return (
    <AppModal 
      title="Delete Promotion" 
      type={DELETE_MODAL} 
      isOpen={isOpenModal} 
      onClose={onCloseModal} 
      onSubmit={onDelete}
    >
      <p className='text-center'>Are you sure you want to delete <b>item</b>?</p>
    </AppModal>
  );
};

export default DeletePromotion;
