import { FC, Fragment } from 'react';
import { Navbar } from 'layouts/Admin/components';
import NewsTable from './Table';
import DeleteNews from './Delete';
import useNewsMangement from './hooks/useNewsManagement';

const NewsManager: FC = () => {
  const { isOpenModal, handleCloseModal, handleOpenModal, handleDeleteNews } = useNewsMangement();

  return (
    <Fragment>
      <Navbar title='News management' />
      <NewsTable onOpenModal={handleOpenModal} />
      <DeleteNews isOpenModal={isOpenModal as boolean} onDelete={handleDeleteNews} onCloseModal={handleCloseModal} />
    </Fragment>
  );
};

export default NewsManager;
