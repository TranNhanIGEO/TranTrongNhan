import { FC, Fragment } from 'react';
import { Params, useParams } from 'react-router-dom';
import { Navbar } from 'layouts/Admin/components';
import ProductForm from './Form';
import useGetProductById from 'hooks/productCRUD/useGetProductById';

const EditProduct: FC = () => {
  const { id }: Readonly<Params<string>> = useParams();
  const { record } = useGetProductById(id);

  return (
    <Fragment>
      <Navbar title='Product Detail' />
      <ProductForm formData={record} />
    </Fragment>
  )
}

export default EditProduct