import { FC, useRef } from 'react';
import { QueryModel } from 'models/Query/queryModel';
import { ProductViewModel } from 'models/DTOs/productModel';
import { ProductProps } from './types/productType';
import configs from 'configs';
import ProductCard from '../components/Card/Product/ProductCard';
import DotSlider from '../components/Slider/Dots/DotSlider';
import useAnimation from 'hooks/common/useAnimation';
import useUpdateCart from 'hooks/cartCRUD/useUpdateCart';
import { ProductQueryModel } from 'models/Query/productQueryModel';
import useFetchData from 'hooks/common/useFetchData';
import StringHelper from 'helpers/stringHelper';
import { GetProductsSuccess } from 'stores/product/productStateTypes';

const Products: FC<ProductProps> = ({ title, categoryId, isNew, isBestSelling }) => {
  const queryModel: QueryModel<ProductViewModel> = {
    ...configs.query.products,
    pageSize: 12,
  };

  const productQueryModel: ProductQueryModel = {
    categoryIds: [categoryId ?? ""],
    isNew: isNew || false,
    isBestSelling: isBestSelling || false,
  }
  
  const query: QueryModel<ProductViewModel> & ProductQueryModel = { ...queryModel, ...productQueryModel };
  const { data } = useFetchData<GetProductsSuccess>(configs.apis.public.product + "?" + StringHelper.toParams(query));
  const { handleCartClick } = useUpdateCart();

  const animateRef = useRef<HTMLDivElement>(null);
  useAnimation(animateRef);

  return (
    <section className="element-container container-sm">
      <div className="d-flex align-items-end text-start text-uppercase">
        <span className="text-nowrap text-white bg-brown px-8 fs-3 ff-montserrat fw-bolder">{title}</span>
        <hr className='w-100' />
      </div>
      <div ref={animateRef} className="element-animate">
        <DotSlider className="row">
          {data?.records?.map(product => (
            <ProductCard key={product.id} product={product} onAddCart={handleCartClick} />
          ))}
        </DotSlider>
      </div>
    </section>
  );
};

export default Products;
