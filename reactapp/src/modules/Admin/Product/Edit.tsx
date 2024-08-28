import { FC, Fragment } from 'react';
import { Params, useParams } from 'react-router-dom';
import { Navbar } from 'layouts/Admin/components';
import ProductForm from './Form';
import useEditProduct from 'hooks/productCRUD/useEditProduct';

const EditProduct: FC = () => {
  const { id }: Readonly<Params<string>> = useParams();
  const { formData, validationErrors, handleChange, handleEditProduct } = useEditProduct(id);

  return (
    <Fragment>
      <Navbar title='Edit Product' />
      <ProductForm 
        formData={formData}
        formValidation={validationErrors}
        onChange={handleChange}
        onSubmit={handleEditProduct}
      />
    </Fragment>
  )
}

export default EditProduct