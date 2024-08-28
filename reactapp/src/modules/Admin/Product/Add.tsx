import { FC, Fragment } from 'react';
import { Navbar } from 'layouts/Admin/components';
import ProductForm from './Form';
import useAddProduct from 'hooks/productCRUD/useAddProduct';

const AddProduct: FC = () => {
  const { formData, validationErrors, handleChange, handleAddProduct } = useAddProduct();
    
  return (
    <Fragment>
      <Navbar title='Add Product' />
      <ProductForm 
        formData={formData}
        formValidation={validationErrors}
        onChange={handleChange}
        onSubmit={handleAddProduct}
      />
    </Fragment>
  )
}

export default AddProduct