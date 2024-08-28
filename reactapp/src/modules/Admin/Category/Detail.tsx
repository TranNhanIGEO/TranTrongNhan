import { FC, Fragment } from 'react';
import { Params, useParams } from 'react-router-dom';
import { Navbar } from 'layouts/Admin/components';
import CategoryForm from './Form';
import useGetCategoryById from 'hooks/categoryCRUD/useGetCategoryById';

const EditCategory: FC = () => {
  const { id }: Readonly<Params<string>> = useParams();
  const { record } = useGetCategoryById(id);

  return (
    <Fragment>
      <Navbar title='Category Detail' />
      <CategoryForm formData={record} />
    </Fragment>
  )
}

export default EditCategory