import { ReactNode } from 'react';
import { TableSortDirections } from './tableTypes';
import { FormControlTypes } from "components/Form/types/formTypes";

export interface TableColumnProps<T> {
  key: keyof T; 
  label: string;
  type?: FormControlTypes;
  viewing?: boolean;
  sorting?: boolean;
  searching?: boolean;
  renderRow?: (item: T) => ReactNode;
}

export interface TableDataStateProps<T> {
  isLoading?: boolean;
  searchTerm?: string;
  sortBy?: keyof T;
  sortDirection?: TableSortDirections;
}

export interface TableDataProps<T> {
  state?: TableDataStateProps<T>
  rows: T[];
  columns: TableColumnProps<T>[];
  onSortChange?: (key: keyof T) => void;
  renderBodyActions?: (item: T) => ReactNode;
}
