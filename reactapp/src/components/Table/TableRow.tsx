import { FC } from 'react';
import { TableRowProps } from 'components/Table/types/tableTypes';

export const TableRow: FC<TableRowProps> = ({ children, ...props }) => {
  return <tr {...props}>{children}</tr>;
};

export default TableRow;