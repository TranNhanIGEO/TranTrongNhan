import { ProductViewModel } from 'models/DTOs/productModel';

export interface ProductListProps {
  products: ProductViewModel[];
  onAddCart: (quantity: number) => void;
}
