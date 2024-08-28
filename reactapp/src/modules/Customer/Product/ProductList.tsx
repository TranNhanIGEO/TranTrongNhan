import { FC } from 'react';
import ProductCard from '../components/Card/Product/ProductCard';
import { ProductListProps } from './types/productListTypes';

const ProductList: FC<ProductListProps> = ({ products, onAddCart }) => {
  return (
    <div className="row">
      {products?.map(product => (
        <ProductCard key={product.id} product={product} onAddCart={onAddCart} />
      ))}
    </div>
  );
};

export default ProductList;
