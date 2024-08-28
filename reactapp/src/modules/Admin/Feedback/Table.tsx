import { FC } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

import { FeedbackViewModel } from 'models/DTOs/feedbackModel';
import { QueryModel } from 'models/Query/queryModel';
import { TableColumnProps } from 'components/Table/types/tableDataTypes';
import { FeedbackTableProps } from './types/tableTypes';

import ManagementTable from 'components/Table/ManagementTable';
import configs from 'configs';

import useQuery from 'hooks/common/useQuery';
import useGetFeedbacks from 'hooks/feedbackCRUD/useGetFeedbacks';

const columns: TableColumnProps<FeedbackViewModel>[] = configs.columns.feedbacks;
const queryModel: QueryModel<FeedbackViewModel> = configs.query.feedbacks;
// const routes = configs.routes.admin.feedback;

const FeedbackTable: FC<FeedbackTableProps> = ({ onOpenModal }) => {
  const { 
    query,
    debouncedQuery,
    handleSort,
    handlePageIndex,
    handlePageSize,
    handleSearchChange,
  } = useQuery<FeedbackViewModel>(queryModel)
  
  const {
    isLoading,
    records, 
    totalRecords, 
    filteredRecords, 
  } = useGetFeedbacks(debouncedQuery)
   
  return (
    <ManagementTable
      rows={records}
      columns={columns}
      onSearchChange={handleSearchChange}
      onSortChange={handleSort}
      onPageIndexChange={handlePageIndex}
      onPageSizeChange={handlePageSize}
      state={{
        ...query,
        isLoading,
        totalRecords,
        filteredRecords
      }}
      renderBodyActions={(item: FeedbackViewModel) => (
        <ButtonGroup className="d-flex justify-content-center gap-3">
          {/* <Link to={`${routes.root}/${item.id}`}>
            <FiEye className="me-md-2 text-info" size={24} />
          </Link> */}
          <Link to='#' onClick={() => onOpenModal(item)}>
            <FiTrash2 className="me-md-2 text-danger" size={24} />
          </Link>
        </ButtonGroup>
      )}
    />
  );
};

export default FeedbackTable;
