import { FC, useRef } from 'react';
import { CategoryViewModel } from 'models/DTOs/categoryModel';
import { QueryModel } from 'models/Query/queryModel';
import configs from 'configs';
import CategoryCard from '../components/Card/Category/CategoryCard';
import useAnimation from 'hooks/common/useAnimation';
import useGetCategories from 'hooks/categoryCRUD/useGetCategories';
import useQuery from 'hooks/common/useQuery';

const queryModel: QueryModel<CategoryViewModel> = {
  ...configs.query.categories,
  pageSize: 6,
};

const Categories: FC = () => {
  const { debouncedQuery } = useQuery(queryModel);
  const { records } = useGetCategories(debouncedQuery);

  const animateRef = useRef<HTMLDivElement>(null);
  useAnimation(animateRef);

  return (
    <section className="element-container container-fluid">
      <div className="element-overlay">
        <div className="element-bg-image__fixed" style={{ backgroundImage: 'url(/img/category.jpg)' }} />
      </div>
      <div className="categories-wrapper">
        <div ref={animateRef} className="element-animate">
          <div className="d-flex flex-wrap">
            {records?.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
