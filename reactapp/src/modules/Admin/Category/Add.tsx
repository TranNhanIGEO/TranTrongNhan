import { FC, Fragment } from 'react';
import { Navbar } from 'layouts/Admin/components';
import CategoryForm from './Form';
import useAddCategory from 'hooks/categoryCRUD/useAddCategory';

const AddCategory: FC = () => {
  const { formData, validationErrors, handleChange, handleAddCategory } = useAddCategory();
    
  return (
    <Fragment>
      <Navbar title='Add Category' />
      <CategoryForm 
        formData={formData}
        formValidation={validationErrors}
        onChange={handleChange}
        onSubmit={handleAddCategory}
      />
    </Fragment>
  )
}

export default AddCategory