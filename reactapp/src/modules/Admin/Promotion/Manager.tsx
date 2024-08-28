import { FC, Fragment } from 'react';
import { Navbar } from 'layouts/Admin/components';
import PromotionTable from './Table';
import DeletePromotion from './Delete';
import usePromotionMangement from './hooks/usePromotionManagement';

const PromotionManager: FC = () => {
  const { isOpenModal, handleCloseModal, handleOpenModal, handleDeletePromotion } = usePromotionMangement();

  return (
    <Fragment>
      <Navbar title='Promotion management' />
      <PromotionTable onOpenModal={handleOpenModal} />
      <DeletePromotion isOpenModal={isOpenModal as boolean} onDelete={handleDeletePromotion} onCloseModal={handleCloseModal} />
    </Fragment>
  );
};

export default PromotionManager;
