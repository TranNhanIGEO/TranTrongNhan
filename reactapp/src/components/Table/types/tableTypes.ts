import { HTMLAttributes } from "react";
import { ORDER_BY_ASC, ORDER_BY_DESC, ORDER_BY_NONE } from 'constants/table';

export type TableSortDirections = 
  | typeof ORDER_BY_ASC 
  | typeof ORDER_BY_DESC 
  | typeof ORDER_BY_NONE;

export interface TableContainerProps extends HTMLAttributes<HTMLTableElement> {}

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

export interface TableHeadCellProps extends HTMLAttributes<HTMLTableCellElement> {
  colSpan?: number;
  rowSpan?: number;
  viewing?: boolean;
  sorting?: boolean;
  sortingDir?: TableSortDirections;
}

export interface TableBodyCellProps extends HTMLAttributes<HTMLTableCellElement> {
  colSpan?: number;
  rowSpan?: number;
  viewing?: boolean;
  searching?: boolean;
  searchTerm?: string;
}
