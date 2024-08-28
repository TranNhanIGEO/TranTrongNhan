import { FC, Fragment } from 'react';
import { Params, useParams } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';
import { Navbar } from 'layouts/Admin/components';
import useGetFeedbackById from 'hooks/feedbackCRUD/useGetFeedbackById';

const Detail: FC = () => {
  const { id }: Readonly<Params<string>> = useParams();
  const { record } = useGetFeedbackById(id);
  const image = `${process.env.REACT_APP_SERVER_DOMAIN}/${record.image}`

  return (
    <Fragment>
      <Navbar title='Feedback Detail' />
      <Card className="shadow h-100">
        <Card.Header className='d-flex justify-content-between align-items-center bg-white'>
          {record.userFullName}
        </Card.Header>
        <Card.Body>
          <Card.Title>{record.productName}</Card.Title>
          <Card.Text>{record.comment}</Card.Text>
          <Card.Text>{record.vote}</Card.Text>
          <Image src={image} alt='' />
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default Detail