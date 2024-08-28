import { FC } from 'react';
import { TableBodyProps } from 'components/Table/types/tableTypes';

const TableBody: FC<TableBodyProps> = ({ children, ...props }) => {
  return <tbody {...props}>{children}</tbody>;
};

export default TableBody;