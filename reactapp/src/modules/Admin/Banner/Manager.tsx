import { FC, Fragment } from 'react';
import { Navbar } from 'layouts/Admin/components';
import BannerTable from './Table';
import DeleteBanner from './Delete';
import useBannerMangement from './hooks/useBannerManagement';

const BannerManager: FC = () => {
  const { isOpenModal, handleCloseModal, handleOpenModal, handleDeleteBanner } = useBannerMangement();

  return (
    <Fragment>
      <Navbar title='Banner management' />
      <BannerTable onOpenModal={handleOpenModal} />
      <DeleteBanner isOpenModal={isOpenModal as boolean} onDelete={handleDeleteBanner} onCloseModal={handleCloseModal} />
    </Fragment>
  );
};

export default BannerManager;
