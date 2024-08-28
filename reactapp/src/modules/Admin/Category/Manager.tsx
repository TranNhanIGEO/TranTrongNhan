import { FC, Fragment } from 'react';
import { Navbar } from 'layouts/Admin/components';
import CategoryTable from './Table';
import DeleteCategory from './Delete';
import useCategoryMangement from './hooks/useCategoryManagement';

const CategoryManager: FC = () => {
  const { isOpenModal, handleCloseModal, handleOpenModal, handleDeleteCategory } = useCategoryMangement();

  return (
    <Fragment>
      <Navbar title='Category management' />
      <CategoryTable onOpenModal={handleOpenModal} />
      <DeleteCategory isOpenModal={isOpenModal as boolean} onDelete={handleDeleteCategory} onCloseModal={handleCloseModal} />
    </Fragment>
  );
};

export default CategoryManager;
