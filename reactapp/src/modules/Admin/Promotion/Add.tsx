import { FC, Fragment } from 'react';
import { Navbar } from 'layouts/Admin/components';
import PromotionForm from './Form';
import useAddPromotion from 'hooks/promotionCRUD/useAddPromotion';

const AddPromotion: FC = () => {
  const { formData, validationErrors, handleChange, handleAddPromotion } = useAddPromotion();
    
  return (
    <Fragment>
      <Navbar title='Add Promotion' />
      <PromotionForm 
        formData={formData}
        formValidation={validationErrors}
        onChange={handleChange}
        onSubmit={handleAddPromotion}
      />
    </Fragment>
  )
}

export default AddPromotion