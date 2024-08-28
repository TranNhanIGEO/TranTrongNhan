import { FC, Fragment } from 'react';
import { Navbar } from 'layouts/Admin/components';
import BannerForm from './Form';
import useAddBanner from 'hooks/bannerCRUD/useAddBanner';

const AddBanner: FC = () => {
  const { formData, validationErrors, handleChange, handleAddBanner } = useAddBanner();
    
  return (
    <Fragment>
      <Navbar title='Add Banner' />
      <BannerForm 
        formData={formData}
        formValidation={validationErrors}
        onChange={handleChange}
        onSubmit={handleAddBanner}
      />
    </Fragment>
  )
}

export default AddBanner