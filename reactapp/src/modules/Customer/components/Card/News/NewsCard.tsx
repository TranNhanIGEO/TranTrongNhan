import './NewsCard.scss';
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';
import { NewsViewModel } from 'models/DTOs/newsModel';
import DateHelper from 'helpers/dateHelper';
import configs from 'configs';

export interface NewsCardProps {
  news: NewsViewModel;
}

const routes = configs.routes.customer.news.root;

const NewsCard: FC<NewsCardProps> = ({ news }) => {
  const createdAt = useMemo(() => DateHelper.toDateString(news.createdAt), [news.createdAt]);

  return (
    <div className="position-relative col-lg-4 col-md-6 col-12 my-6">
      <div className="news-card d-flex flex-column h-100 p-4 rounded-3">
        <Link className="news-card-image overflow-hidden cursor-pointer rounded-3 mb-3" to={`${routes}/${news.id}`}>
          <img className="object-fit-cover" src={`${process.env.REACT_APP_SERVER_DOMAIN}/${news.image}`} alt={news.title} />
        </Link>
        <div className="news-card-body mb-8 d-flex flex-column">
          <div className="d-flex align-items-center mb-3 gap-1 fs-7 text-muted">
            <FiClock />
            {createdAt}
          </div>
          <div className="news-card-title mb-3">
            <Link className="ff-pacifico fs-4" to={`${routes}/${news.id}`}>
              {news.title}
            </Link>
          </div>
          <div className="news-card-text">
            <span className="ff-montserrat fs-6">{news.summary}</span>
          </div>
        </div>
        <div className="news-card-detail">
          <Link className="ff-montserrat fs-6 fw-bolder fst-italic" to={`${routes}/${news.id}`}>
            Xem thêm...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
