import './CategoryCard.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CategoryViewModel } from 'models/DTOs/categoryModel';
import configs from 'configs';

export interface CategoryCardProps {
  category: CategoryViewModel;
}

const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  return (
    <div key={category.id} className="position-relative col-xxl-2 col-md-4 col-6">
      <Link
        className="categories-card d-flex align-items-center justify-content-center m-6 cursor-pointer"
        to={configs.routes.customer.product.root}
        state={{ categoryId: category.id }}
      >
        <div className="categories-card-image overflow-hidden rounded-circle">
          <img className="object-fit-cover" src={`${process.env.REACT_APP_SERVER_DOMAIN}/${category.image}`} alt={category.name} loading="lazy" />
        </div>
        <div className="categories-card-caption element-position__center">
          <p className="text-nowrap text-capitalize ff-playball fs-3">{category.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
