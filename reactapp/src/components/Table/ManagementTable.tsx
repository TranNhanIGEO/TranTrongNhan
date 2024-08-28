import { Card } from 'react-bootstrap';
import TableData from './TableData';
import TablePaging from './TablePaging';
import TableAction from './TableAction';
import { ManagementTableProps } from './types/manageTableTypes';
import TableRowCount from './TableRowCount';

const ManagementTable = <T,>({ 
  rows, 
  columns, 
  state, 
  onSortChange, 
  onSearchChange, 
  onPageIndexChange, 
  onPageSizeChange, 
  renderHeaderActions, 
  renderBodyActions 
}: ManagementTableProps<T>) => {
  
  const { 
    isLoading,
    searchTerm, 
    pageIndex, 
    pageSize, 
    sortBy, 
    sortDirection, 
    totalRecords, 
    filteredRecords 
  } = state;

  return (
    <Card className="shadow h-100">
      <Card.Header className="d-flex justify-content-between align-items-center bg-white">
        <TableAction 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange} 
          renderHeaderActions={renderHeaderActions} 
        />
      </Card.Header>
      <Card.Body className="bg-white overflow-hidden py-0">
        <TableData
          state={{ isLoading, searchTerm, sortBy, sortDirection }}
          rows={rows}
          columns={columns}
          onSortChange={onSortChange}
          renderBodyActions={renderBodyActions}
        />
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center bg-white">
        <TableRowCount 
          state={{ pageIndex, pageSize, totalRecords, filteredRecords }}
        />
        <TablePaging 
          state={{ pageIndex, pageSize, totalRecords, filteredRecords }}
          onPageIndexChange={onPageIndexChange} 
          onPageSizeChange={onPageSizeChange} 
        />
      </Card.Footer>
    </Card>
  );
};

export default ManagementTable;
