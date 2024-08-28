import { FC, Fragment } from 'react';
import { Params, useParams } from 'react-router-dom';
import { Navbar } from 'layouts/Admin/components';
import BannerForm from './Form';
import useGetBannerById from 'hooks/bannerCRUD/useGetBannerById';

const EditBanner: FC = () => {
  const { id }: Readonly<Params<string>> = useParams();
  const { record } = useGetBannerById(id);

  return (
    <Fragment>
      <Navbar title='Banner Detail' />
      <BannerForm formData={record} />
    </Fragment>
  )
}

export default EditBanner