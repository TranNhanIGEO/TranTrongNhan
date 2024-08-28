import { TablePagingStateProps } from "./tablePagingTypes";

export interface TableRowCountStateProps {
  totalRecords: number;
  filteredRecords: number;
}

export interface TableRowCountProps {
  state: TableRowCountStateProps & TablePagingStateProps;
}
