import configs from 'configs';
import DateHelper from 'helpers/dateHelper';
import useGetNews from 'hooks/newsCRUD/useGetNews'
import { NewsViewModel } from 'models/DTOs/newsModel';
import { QueryModel } from 'models/Query/queryModel';
import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const queryModel: QueryModel<NewsViewModel> = configs.query.news;

const News: FC = () => {
  const { records } = useGetNews(queryModel);

  return (
    <Container>
      <div className="mt-6">
        <h3 className="text-center ff-pacifico">Tin tức</h3>
      </div>
      <ul className='my-6'>
        {records?.map(record => (
          <li key={record.id} className='position-relative p-3 mb-3 rounded-3 shadow'>
            <Row to={`${configs.routes.customer.news.root}/${record.id}`}>
              <Col lg={3} md={6} xs={12}>
                <Link to={`${configs.routes.customer.news.root}/${record.id}`} className="mb-md-0 mb-6">
                  <img className='rounded-3' src={`${process.env.REACT_APP_SERVER_DOMAIN}/${record.image}`} alt={record.title} />
                </Link>
              </Col>
              <Col lg={9} md={6} xs={12}>
                <Link to={`${configs.routes.customer.news.root}/${record.id}`}>
                  <h4 className="fw-semibold mb-3">{record.title}</h4>
                </Link>
                <div className="d-flex align-items-center mb-3 gap-1 fs-7 text-muted">
                  <FiClock />
                  {DateHelper.toDateString(record.createdAt)}
                </div>
                <p className="mb-8">{record.summary}</p>
                <Link to={`${configs.routes.customer.news.root}/${record.id}`} className='position-absolute bottom-0 end-0 p-3'>
                  <p className="ff-montserrat fst-italic fw-bolder">Xem thêm...</p>
                </Link>
              </Col>
            </Row>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default News