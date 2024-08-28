import { FC, Fragment } from 'react';
import { Params, useParams } from 'react-router-dom';
import { Navbar } from 'layouts/Admin/components';
import PromotionForm from './Form';
import useEditPromotion from 'hooks/promotionCRUD/useEditPromotion';

const EditPromotion: FC = () => {
  const { id }: Readonly<Params<string>> = useParams();
  const { formData, validationErrors, handleChange, handleEditPromotion } = useEditPromotion(id);

  return (
    <Fragment>
      <Navbar title='Edit Promotion' />
      <PromotionForm 
        formData={formData}
        formValidation={validationErrors}
        onChange={handleChange}
        onSubmit={handleEditPromotion}
      />
    </Fragment>
  )
}

export default EditPromotion