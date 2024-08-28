import { FC, Fragment } from 'react';
import { Params, useParams } from 'react-router-dom';
import { Navbar } from 'layouts/Admin/components';
import NewsForm from './Form';
import useGetNewsById from 'hooks/newsCRUD/useGetNewsById';

const EditNews: FC = () => {
  const { id }: Readonly<Params<string>> = useParams();
  const { record } = useGetNewsById(id);

  return (
    <Fragment>
      <Navbar title='News Detail' />
      <NewsForm formData={record} />
    </Fragment>
  )
}

export default EditNews