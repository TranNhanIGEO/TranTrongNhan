import { FC, Fragment } from 'react';
import { Params, useParams } from 'react-router-dom';
import { Navbar } from 'layouts/Admin/components';
import CategoryForm from './Form';
import useEditCategory from 'hooks/categoryCRUD/useEditCategory';

const EditCategory: FC = () => {
  const { id }: Readonly<Params<string>> = useParams();
  const { formData, validationErrors, handleChange, handleEditCategory } = useEditCategory(id);

  return (
    <Fragment>
      <Navbar title='Edit Category' />
      <CategoryForm 
        formData={formData}
        formValidation={validationErrors}
        onChange={handleChange}
        onSubmit={handleEditCategory}
      />
    </Fragment>
  )
}

export default EditCategory