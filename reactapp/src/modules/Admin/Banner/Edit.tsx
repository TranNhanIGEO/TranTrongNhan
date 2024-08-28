import { FC, Fragment } from 'react';
import { Params, useParams } from 'react-router-dom';
import { Navbar } from 'layouts/Admin/components';
import BannerForm from './Form';
import useEditBanner from 'hooks/bannerCRUD/useEditBanner';

const EditBanner: FC = () => {
  const { id }: Readonly<Params<string>> = useParams();
  const { formData, validationErrors, handleChange, handleEditBanner } = useEditBanner(id);

  return (
    <Fragment>
      <Navbar title='Edit Banner' />
      <BannerForm 
        formData={formData}
        formValidation={validationErrors}
        onChange={handleChange}
        onSubmit={handleEditBanner}
      />
    </Fragment>
  )
}

export default EditBanner