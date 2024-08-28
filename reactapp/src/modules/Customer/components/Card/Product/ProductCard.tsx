import './ProductCard.scss';
import { FC } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import { IoHeartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { ProductViewModel } from 'models/DTOs/productModel';
import configs from 'configs';
import NumberHelper from 'helpers/numberHelper';

export interface ProductCardProps {
  product: ProductViewModel;
  onAddCart: (quantity: number, productId?: string) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onAddCart }) => {
  return (
    <div className="position-relative col-lg-3 col-md-6 col-6 my-6">
      <div className="product-card d-flex flex-column rounded-3 h-100">
        <div className="product-card-image d-block cursor-pointer">
          <div className="product-card-thumbnail overflow-hidden rounded-3">
            <Link to={`${configs.routes.customer.product.root}/${product.id}`}>
              <img className="object-fit-cover" src={`${process.env.REACT_APP_SERVER_DOMAIN}/${product.image}`} alt={product.name} loading="lazy" />
            </Link>
          </div>
          <div className="product-card-label d-flex flex-column gap-2">
            {product.isNew && <span className="text-center text-uppercase text-white bg-danger px-2 ff-montserrat fs-8 fw-bolder cursor-pointer">New</span>}
            <span className="text-center text-uppercase text-white bg-black px-2 ff-montserrat fs-8 fw-bolder cursor-pointer">{product.discountPercentage ?? 0}%</span>
          </div>
          <div className="product-card-action">
            <div className="text-center p-4 opacity-75 cursor-pointer">
              <IoHeartOutline size={16} />
            </div>
            <div className="text-center p-4 opacity-75 cursor-pointer" onClick={() => onAddCart(1, product.id)}>
              <BsCartPlus size={16} />
            </div>
          </div>
        </div>
        <div className="product-card-body d-flex flex-column justify-content-between h-100">
          <div className="text-center mt-3 mx-3 cursor-pointer">
            <Link className="ff-montserrat fs-6 fw-bolder" to={`${configs.routes.customer.product.root}/${product.id}`}>
              {product.name}
            </Link>
          </div>
          <div className="d-flex justify-content-around m-3">
            <span className="text-danger ff-montserrat fs-6 fw-bolder">{NumberHelper.toDecimalString(product.finalPrice)}</span>
            <span className="text-dark text-decoration-line-through ff-montserrat fs-6 fw-bold">{NumberHelper.toDecimalString(product.price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
