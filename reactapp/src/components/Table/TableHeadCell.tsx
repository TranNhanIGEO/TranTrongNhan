import { FC } from 'react';
import clsx from 'clsx';
import { TableHeadCellProps } from 'components/Table/types/tableTypes';
import { ORDER_BY_ASC, ORDER_BY_DESC, ORDER_BY_NONE } from 'constants/table';

const TableHeadCell: FC<TableHeadCellProps> = ({ 
  viewing, 
  sorting, 
  sortingDir, 
  className, 
  children, 
  ...props 
}) => {
  const thClass = clsx(className, {
    'table-cell': viewing ?? true,
    'd-none': !viewing ?? false,
    'asc': sorting && sortingDir === ORDER_BY_ASC,
    'desc': sorting && sortingDir === ORDER_BY_DESC,
    'none': !sortingDir ?? ORDER_BY_NONE,
  });

  return (
    <th className={thClass} {...props}>
      {children}
      {sorting && <span className="table-sorting"></span>}
    </th>
  );
};

export default TableHeadCell;
