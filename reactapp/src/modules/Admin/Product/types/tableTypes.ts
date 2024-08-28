import { ProductViewModel } from 'models/DTOs/productModel';

export interface ProductTableProps {
  onOpenModal: (item: ProductViewModel) => void;
}
