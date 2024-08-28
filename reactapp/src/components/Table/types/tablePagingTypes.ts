import { ChangeEvent } from 'react';
import { TableRowCountStateProps } from './tableRowCount';

export interface TablePagingStateProps {
  pageSize: number;
  pageIndex: number;
}

export interface TablePagingProps {
  state: TablePagingStateProps & TableRowCountStateProps;
  onPageSizeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onPageIndexChange: (pageIndex: number) => void;
}
