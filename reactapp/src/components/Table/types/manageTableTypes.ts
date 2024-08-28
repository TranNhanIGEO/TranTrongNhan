import { TablePagingProps, TablePagingStateProps } from './tablePagingTypes';
import { TableDataProps, TableDataStateProps } from './tableDataTypes';
import { TableRowCountProps, TableRowCountStateProps } from './tableRowCount';
import { TableActionProps } from './tableActionTypes';

export interface ManagementTableStateProps<T> extends TableDataStateProps<T>, TablePagingStateProps, TableRowCountStateProps {}

export interface ManagementTableProps<T> extends TableDataProps<T>, TablePagingProps, TableRowCountProps, TableActionProps {
  state: ManagementTableStateProps<T>;
}
