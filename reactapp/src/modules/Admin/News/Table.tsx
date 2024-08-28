import { FC } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FiEdit3, FiTrash2, FiEye } from 'react-icons/fi';

import { ADD_ROUTER, EDIT_ROUTER } from 'constants/router';
import { NewsViewModel } from 'models/DTOs/newsModel';
import { QueryModel } from 'models/Query/queryModel';
import { TableColumnProps } from 'components/Table/types/tableDataTypes';
import { NewsTableProps } from './types/tableTypes';

import ManagementTable from 'components/Table/ManagementTable';
import configs from 'configs';

import useQuery from 'hooks/common/useQuery';
import useGetNews from 'hooks/newsCRUD/useGetNews';

const columns: TableColumnProps<NewsViewModel>[] = configs.columns.news;
const queryModel: QueryModel<NewsViewModel> = configs.query.news;
const routes = configs.routes.admin.news;

const NewsTable: FC<NewsTableProps> = ({ onOpenModal }) => {
  const { 
    query,
    debouncedQuery,
    handleSort,
    handlePageIndex,
    handlePageSize,
    handleSearchChange,
  } = useQuery<NewsViewModel>(queryModel)
  
  const {
    isLoading,
    records, 
    totalRecords, 
    filteredRecords, 
  } = useGetNews(debouncedQuery)
   
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
      renderHeaderActions={() => (
        <Link to={`${routes.root}/${ADD_ROUTER}`} className="btn btn-outline-primary d-flex align-items-center rounded-3">
          <FaPlus className="me-2" />
          <span>Add new</span>
        </Link>
      )}
      renderBodyActions={(item: NewsViewModel) => (
        <ButtonGroup className="d-flex justify-content-center gap-3">
          <Link to={`${routes.root}/${item.id}`}>
            <FiEye className="me-md-2 text-info" size={24} />
          </Link>
          <Link to={`${routes.root}/${item.id}/${EDIT_ROUTER}`}>
            <FiEdit3 className="me-md-2 text-warning" size={24} />
          </Link>
          <Link to='#' onClick={() => onOpenModal(item)}>
            <FiTrash2 className="me-md-2 text-danger" size={24} />
          </Link>
        </ButtonGroup>
      )}
    />
  );
};

export default NewsTable;
