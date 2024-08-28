import { FC, Fragment } from 'react';
import { Navbar } from 'layouts/Admin/components';
import ProductTable from './Table';
import DeleteProduct from './Delete';
import useProductMangement from './hooks/useProductManagement';

const ProductManager: FC = () => {
  const { isOpenModal, handleCloseModal, handleOpenModal, handleDeleteProduct } = useProductMangement();

  return (
    <Fragment>
      <Navbar title='Product management' />
      <ProductTable onOpenModal={handleOpenModal} />
      <DeleteProduct isOpenModal={isOpenModal as boolean} onDelete={handleDeleteProduct} onCloseModal={handleCloseModal} />
    </Fragment>
  );
};

export default ProductManager;
