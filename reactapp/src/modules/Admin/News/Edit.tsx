import { FC, Fragment } from 'react';
import { Params, useParams } from 'react-router-dom';
import { Navbar } from 'layouts/Admin/components';
import NewsForm from './Form';
import useEditNews from 'hooks/newsCRUD/useEditNews';

const EditNews: FC = () => {
  const { id }: Readonly<Params<string>> = useParams();
  const { formData, validationErrors, setFormData, handleChange, handleEditNews } = useEditNews(id);

  return (
    <Fragment>
      <Navbar title='Edit News' />
      <NewsForm 
        formData={formData}
        formValidation={validationErrors}
        setFormData={setFormData}
        onChange={handleChange}
        onSubmit={handleEditNews}
      />
    </Fragment>
  )
}

export default EditNews