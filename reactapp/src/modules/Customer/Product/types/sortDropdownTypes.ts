import { ReactNode } from "react";
import { TableSortDirections } from "components/Table/types/tableTypes";
import { ProductViewModel } from "models/DTOs/productModel";

export interface SortButtonTypes {
  label: string;
  field: keyof ProductViewModel;
  orderBy: TableSortDirections;
  icon: ReactNode;
}

export interface SortDropdownProps {
  sortBy?: keyof ProductViewModel;
  sortDirection?: string;
  handleSort?: (field: keyof ProductViewModel, orderBy: TableSortDirections) => void;
}
