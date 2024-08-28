import { FC } from 'react';
import { DELETE_MODAL } from 'constants/modal';
import { DeleteBannerTypes } from './types/deleteTypes';
import AppModal from 'components/UI/Modal';

const DeleteBanner: FC<DeleteBannerTypes> = ({ isOpenModal, onCloseModal, onDelete }) => {
  return (
    <AppModal 
      title="Delete banner" 
      type={DELETE_MODAL} 
      isOpen={isOpenModal} 
      onClose={onCloseModal} 
      onSubmit={onDelete}
    >
      <p className='text-center'>Are you sure you want to delete <b>item</b>?</p>
    </AppModal>
  );
};

export default DeleteBanner;
