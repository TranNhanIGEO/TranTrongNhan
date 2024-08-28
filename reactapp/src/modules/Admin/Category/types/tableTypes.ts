import { CategoryViewModel } from 'models/DTOs/categoryModel';

export interface CategoryTableProps {
  onOpenModal: (item: CategoryViewModel) => void;
}
