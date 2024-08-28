import { FC, Fragment } from 'react';
import { Navbar } from 'layouts/Admin/components';
import NewsForm from './Form';
import useAddNews from 'hooks/newsCRUD/useAddNews';

const AddNews: FC = () => {
  const { formData, validationErrors, setFormData, handleChange, handleAddNews } = useAddNews();
    
  return (
    <Fragment>
      <Navbar title='Add News' />
      <NewsForm 
        formData={formData}
        formValidation={validationErrors}
        setFormData={setFormData}
        onChange={handleChange}
        onSubmit={handleAddNews}
      />
    </Fragment>
  )
}

export default AddNews