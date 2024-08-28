import { FC, Fragment } from 'react';
import { Params, useParams } from 'react-router-dom';
import { Navbar } from 'layouts/Admin/components';
import PromotionForm from './Form';
import useGetPromotionById from 'hooks/promotionCRUD/useGetPromotionById';

const EditPromotion: FC = () => {
  const { id }: Readonly<Params<string>> = useParams();
  const { record } = useGetPromotionById(id);

  return (
    <Fragment>
      <Navbar title='Promotion Detail' />
      <PromotionForm formData={record} />
    </Fragment>
  )
}

export default EditPromotion