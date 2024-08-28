import { useRef } from 'react';
import { QueryModel } from 'models/Query/queryModel';
import { NewsViewModel } from 'models/DTOs/newsModel';
import configs from 'configs';
import DotSlider from '../components/Slider/Dots/DotSlider';
import NewsCard from '../components/Card/News/NewsCard';
import Heading from '../components/Heading/Heading';
import useQuery from 'hooks/common/useQuery';
import useGetNews from 'hooks/newsCRUD/useGetNews';
import useAnimation from 'hooks/common/useAnimation';

const queryModel: QueryModel<NewsViewModel> = {
  ...configs.query.news,
  pageSize: 4,
};

const News = () => {
  const { debouncedQuery } = useQuery(queryModel);
  const { records } = useGetNews(debouncedQuery);

  const animateRef = useRef<HTMLDivElement>(null);
  useAnimation(animateRef);

  return (
    <section className="element-container container-sm">
      <Heading title="Tin tức" isBreak />
      <div ref={animateRef} className="element-animate">
        <DotSlider className="row">
          {records?.map(news => (
            <NewsCard key={news.id} news={news} />
          ))}
        </DotSlider>
      </div>
    </section>
  );
};

export default News;
