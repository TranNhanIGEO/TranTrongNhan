import clsx from 'clsx';
import { FC, useEffect, useRef } from 'react';
import { TableBodyCellProps } from 'components/Table/types/tableTypes';
import useHightlight from './hooks/useHightlight';

const TableBodyCell: FC<TableBodyCellProps> = ({ 
  viewing, 
  searchTerm, 
  className, 
  children, 
  ...props 
}) => {
  const tdRef = useRef<HTMLTableCellElement>(null);
  const { handleHighlight } = useHightlight(tdRef, searchTerm);

  useEffect(() => {
    handleHighlight()
  }, [handleHighlight])

  const tdClass = clsx(className, {
    "table-cell": viewing ?? true,
    "d-none": !viewing ?? false,
  })

  return <td ref={tdRef} className={tdClass} {...props}>{children}</td>;
};

export default TableBodyCell;