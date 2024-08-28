import { FC } from 'react';
import { CardText } from 'react-bootstrap';
import { TableRowCountProps } from './types/tableRowCount';
import useCalculateRow from './hooks/useCalculateRow';

const TableRowCount: FC<TableRowCountProps> = ({ state }) => {
  const { 
    pageIndex, 
    pageSize, 
    totalRecords, 
    filteredRecords 
  } = state;
  
  const { 
    fromRow, 
    toRow, 
    totalRows, 
    fiteredRows 
  } = useCalculateRow(pageIndex, pageSize, totalRecords, filteredRecords);

  return (
    <CardText className="mb-0 ms-md-5 fs-7">
      {fromRow} - {toRow} of {fiteredRows} {totalRows && `(filtered from ${totalRows} records)`}
    </CardText>
  );
};

export default TableRowCount;
